import { serve } from "@hono/node-server"
import app from "./app"
import config from "./shared/config"
import logger from "./shared/logger"

serve({
  fetch: app.fetch,
  port: config.server.port
}, () => {
  logger.info(`Started server on port ${config.server.port}`)
})
