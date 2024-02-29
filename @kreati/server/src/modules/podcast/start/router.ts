import { Hono } from "hono";
import { Podcast } from "../model"
import ServerResponse from "@kreati/server/shared/infrastructure/server/utils/response"
import JwtMiddleware from "@kreati/server/shared/infrastructure/server/middleware/jwt"
import { StatusCodes } from "http-status-codes";
import { APIError } from "@kreati/server/shared/infrastructure/server/utils/error";

export default new Hono()
  .post("/:id/start",
    JwtMiddleware,
    async (c) => {
      const id = c.req.param("id")
      const { user } = c.var

      const podcast = await Podcast.findOne({
        _id: id,
        creatorId: user._id
      })

      if (!podcast)
        return c.json(
          ServerResponse
            .Error
            .response(new APIError("Podcast not found", { code: StatusCodes.NOT_FOUND }))
        )

      return c.json(
        ServerResponse
          .Success
          .response({
            id: podcast._id.toString()
          },
            "Podcast started successfully!")
      )
    })

