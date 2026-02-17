import { BusEvent } from "@/bus/bus-event"
import z from "zod"

export const Event = {
  Connected: BusEvent.define("server.connected", z.object({})),
  Disposed: BusEvent.define("global.disposed", z.object({})),
  Error: BusEvent.define(
    "server.error",
    z.object({
      requestID: z.string().optional(),
      method: z.string().optional(),
      path: z.string().optional(),
      name: z.string(),
      message: z.string(),
    }),
  ),
}
