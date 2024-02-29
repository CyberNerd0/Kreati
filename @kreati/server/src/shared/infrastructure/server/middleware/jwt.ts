import { MiddlewareHandler } from "hono"
import { HydratedDocument } from "mongoose"
import User, { UserSchema } from "@kreati/server/shared/database/models/user"
import { APIError } from "../utils/error"
import { StatusCodes } from "http-status-codes"
import TokenService from "@kreati/server/shared/services/token"

export const JwtMiddleware: MiddlewareHandler<{
  Variables: {
    user: HydratedDocument<UserSchema>
  }
}> = async (c, next) => {
  const authHeader = c.req.header("authorization")
  if (!authHeader)
    throw new APIError("Invalid token!", { code: StatusCodes.UNAUTHORIZED })

  const [, suppliedAccessToken] = authHeader.split(" ")
  if (!suppliedAccessToken)
    throw new APIError("Invalid token!", { code: StatusCodes.UNAUTHORIZED })

  const verifiedAccessToken =
    await TokenService.verifyAccessToken(suppliedAccessToken)
  if (!verifiedAccessToken)
    throw new APIError("Invalid token!", { code: StatusCodes.UNAUTHORIZED })

  const user = await User.findOne({
    username: verifiedAccessToken.username
  })

  if (!user)
    throw new APIError("Invalid token!", { code: StatusCodes.UNAUTHORIZED })

  c.set('user', user)

  await next()
}

export default JwtMiddleware

