import { Hono } from "hono";
import { Podcast } from "../model"
import ServerResponse from "@kreati/server/shared/infrastructure/server/utils/response"

export default new Hono()
  .get("/",
    async (c) => {
      const allPodcasts = await Podcast.find()

      return c.json(
        ServerResponse
          .Success
          .response(allPodcasts)
      )
    })

