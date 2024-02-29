import { Hono } from "hono";
import schema from "./schema"
import { zValidator } from "@hono/zod-validator"
import { Podcast } from "../model"
import ServerResponse from "@kreati/server/shared/infrastructure/server/utils/response"
import JwtMiddleware from "@kreati/server/shared/infrastructure/server/middleware/jwt"

export default new Hono()
  .post("/",
    JwtMiddleware,
    zValidator("json", schema),
    async (c) => {
      const payload = c.req.valid("json")
      const { user } = c.var

      const podcast = await Podcast.create({
        ...payload,
        creatorId: user._id
      })

      return c.json(
        ServerResponse
          .Success
          .response({
            id: podcast._id.toString()
          },
            "Podcast created")
      )
    })

