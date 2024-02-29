import { Env, ErrorHandler } from 'hono'
import { StatusCodes } from 'http-status-codes'

export class APIError<T extends StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR> extends Error {
  public declare code: StatusCodes
  public declare cause?: Error

  constructor(error: string, { code, cause }: { cause?: Error, code: T }) {
    super(error)
    this.name = "APIError"
    this.code = code
    this.cause = cause
  }
}

export const handler: ErrorHandler<Env> = (err: Error, c) => {
  if (err instanceof APIError)
    return c.json({ error: err.message }, { status: err.code })

  console.warn(err)
  return c.json({ error: "Sorry an error occurred!" }, StatusCodes.INTERNAL_SERVER_ERROR)
}


