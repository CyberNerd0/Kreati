import { serve } from "@hono/node-server"
import app from "./app"
import config from "./shared/config"
import logger from "./shared/logger"
import DatabaseService from "./shared/database/service"

serve({
  fetch: app.fetch,
  port: config.server.port
}, async () => {
  await DatabaseService.connect()
  logger.info(`Started server on port ${config.server.port}`)
})
