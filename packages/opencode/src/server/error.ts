import { resolver } from "hono-openapi"
import z from "zod"
import { NotFoundError } from "../storage/db"
import { Provider } from "../provider/provider"
import { NamedError } from "@opencode-ai/util/error"
import type { ContentfulStatusCode } from "hono/utils/http-status"

export const ERRORS = {
  400: {
    description: "Bad request",
    content: {
      "application/json": {
        schema: resolver(
          z
            .object({
              data: z.any(),
              errors: z.array(z.record(z.string(), z.any())),
              success: z.literal(false),
            })
            .meta({
              ref: "BadRequestError",
            }),
        ),
      },
    },
  },
  404: {
    description: "Not found",
    content: {
      "application/json": {
        schema: resolver(NotFoundError.Schema),
      },
    },
  },
} as const

export function errors(...codes: number[]) {
  return Object.fromEntries(codes.map((code) => [code, ERRORS[code as keyof typeof ERRORS]]))
}

export function status(input: NamedError): ContentfulStatusCode {
  if (input instanceof NotFoundError) return 404
  if (input instanceof Provider.ModelNotFoundError) return 400
  if (input.name.startsWith("Worktree")) return 400
  return 500
}
