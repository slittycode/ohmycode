import { Database as BunDatabase } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"
export * from "drizzle-orm"
import { Context } from "../util/context"
import { lazy } from "../util/lazy"
import { Global } from "../global"
import { Log } from "../util/log"
import { NamedError } from "@opencode-ai/util/error"
import z from "zod"
import path from "path"
import { createHash } from "node:crypto"
import { readFileSync, readdirSync } from "fs"
import * as schema from "./schema"

declare const OPENCODE_MIGRATIONS: { sql: string; timestamp: number }[] | undefined

export const NotFoundError = NamedError.create(
  "NotFoundError",
  z.object({
    message: z.string(),
  }),
)

const log = Log.create({ service: "db" })

export namespace Database {
  export const Path = path.join(Global.Path.data, "ohmycode.db")
  type Schema = typeof schema
  function createClient(sqlite: BunDatabase) {
    return drizzle({ client: sqlite, schema })
  }

  type Client = ReturnType<typeof createClient>
  export type Transaction = Parameters<Client["transaction"]>[0] extends (tx: infer T) => any ? T : never

  type Journal = { sql: string; timestamp: number }[]

  function time(tag: string) {
    const match = /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/.exec(tag)
    if (!match) return 0
    return Date.UTC(
      Number(match[1]),
      Number(match[2]) - 1,
      Number(match[3]),
      Number(match[4]),
      Number(match[5]),
      Number(match[6]),
    )
  }

  function migrations(dir: string, after = 0): Journal {
    const dirs = readdirSync(dir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => ({ name: entry.name, timestamp: time(entry.name) }))
      .filter((entry) => entry.timestamp > after)
      .sort((a, b) => a.timestamp - b.timestamp)

    return dirs
      .map((entry) => {
        const file = path.join(dir, entry.name, "migration.sql")
        if (!Bun.file(file).size) return
        return {
          sql: readFileSync(file, "utf-8"),
          timestamp: entry.timestamp,
        }
      })
      .filter(Boolean) as Journal
  }

  function migrationTable(db: Client) {
    db.$client.exec(`
      CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        hash text NOT NULL,
        created_at numeric
      )
    `)
  }

  function migrationLatest(db: Client) {
    migrationTable(db)
    const latest = db.$client
      .query(`SELECT created_at FROM "__drizzle_migrations" ORDER BY created_at DESC LIMIT 1`)
      .get() as { created_at: number } | null
    return latest ? Number(latest.created_at) : 0
  }

  function apply(db: Client, entries: Journal) {
    if (entries.length === 0) return
    db.$client.transaction((batch: Journal) => {
      for (const entry of batch) {
        const statements = entry.sql
          .split("--> statement-breakpoint")
          .map((statement) => statement.trim())
          .filter(Boolean)

        for (const statement of statements) db.$client.exec(statement)

        db.$client
          .query(`INSERT INTO "__drizzle_migrations" ("hash", "created_at") VALUES (?, ?)`)
          .run(createHash("sha256").update(entry.sql).digest("hex"), entry.timestamp)
      }
    })(entries)
  }

  export const Client = lazy(() => {
    log.info("opening database", { path: path.join(Global.Path.data, "ohmycode.db") })

    const sqlite = new BunDatabase(path.join(Global.Path.data, "ohmycode.db"), { create: true })

    sqlite.run("PRAGMA journal_mode = WAL")
    sqlite.run("PRAGMA synchronous = NORMAL")
    sqlite.run("PRAGMA busy_timeout = 5000")
    sqlite.run("PRAGMA cache_size = -64000")
    sqlite.run("PRAGMA foreign_keys = ON")
    sqlite.run("PRAGMA wal_checkpoint(PASSIVE)")

    const db = createClient(sqlite)
    const latest = migrationLatest(db)

    // Apply schema migrations
    const entries =
      typeof OPENCODE_MIGRATIONS !== "undefined"
        ? OPENCODE_MIGRATIONS.filter((entry) => entry.timestamp > latest)
        : migrations(path.join(import.meta.dirname, "../../migration"), latest)
    if (entries.length > 0) {
      log.info("applying migrations", {
        count: entries.length,
        mode: typeof OPENCODE_MIGRATIONS !== "undefined" ? "bundled" : "dev",
        latest,
      })
      apply(db, entries)
    }

    return db
  })

  export type TxOrDb = Transaction | Client

  const ctx = Context.create<{
    tx: TxOrDb
    effects: (() => void | Promise<void>)[]
  }>("database")

  export function use<T>(callback: (trx: TxOrDb) => T): T {
    try {
      return callback(ctx.use().tx)
    } catch (err) {
      if (err instanceof Context.NotFound) {
        const effects: (() => void | Promise<void>)[] = []
        const result = ctx.provide({ effects, tx: Client() }, () => callback(Client()))
        for (const effect of effects) effect()
        return result
      }
      throw err
    }
  }

  export function effect(fn: () => any | Promise<any>) {
    try {
      ctx.use().effects.push(fn)
    } catch {
      fn()
    }
  }

  export function transaction<T>(callback: (tx: TxOrDb) => T): T {
    try {
      return callback(ctx.use().tx)
    } catch (err) {
      if (err instanceof Context.NotFound) {
        const effects: (() => void | Promise<void>)[] = []
        const result = Client().transaction((tx) => {
          return ctx.provide({ tx, effects }, () => callback(tx))
        })
        for (const effect of effects) effect()
        return result
      }
      throw err
    }
  }
}
