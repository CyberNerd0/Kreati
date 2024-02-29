import { Hono } from "hono"
import { router as podcastRouter } from "./podcast"

export default new Hono()
  .route("/podcasts", podcastRouter)
