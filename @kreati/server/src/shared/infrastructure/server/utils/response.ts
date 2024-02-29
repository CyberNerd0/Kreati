import { StatusCodes } from "http-status-codes";
import { APIError } from "./error";

namespace ServerResponse {
  export namespace Error {
    type ResponseWithNothing = {
      type: "error"
    }

    type ResponseGeneric<T = unknown> = ResponseWithNothing & {
      error?: T
      message?: string
      status?: StatusCodes
    }

    type ResponseWithMessage<T extends StatusCodes> = ResponseWithNothing & {
      message: string
      status: T
    }

    type ResponseWithErrorAndMessage<Code extends StatusCodes, Err> = ResponseWithNothing & ResponseWithMessage<Code> & {
      error: Err
    }

    export function response<T extends StatusCodes>(error: APIError<T>): ResponseWithMessage<T>
    export function response<Code extends StatusCodes, Err>(error: APIError<Code>, err: Err): ResponseWithErrorAndMessage<Code, Err>

    export function response<T>(error: APIError, err?: T): unknown {
      const response: ResponseGeneric<T> = {
        type: "error",
        message: error.message,
        status: error.code
      }

      if (err)
        response.error = err

      return response
    }
  }

  export namespace Success {
    type ResponseWithNothing = {
      type: "success"
    }

    type ResponseGeneric<T = unknown> = ResponseWithNothing & {
      data?: T
      message?: string
      status?: StatusCodes
    }

    type ResponseWithData<T, Code extends StatusCodes> = ResponseWithNothing & {
      data: T
      status: Code
    }

    type ResponseWithDataAndMessage<T, Code extends StatusCodes> = ResponseWithNothing & ResponseWithData<T, Code> & {
      message: string
    }

    type ResponseWithMessage<Code extends StatusCodes> = ResponseWithNothing & {
      status: Code
      message: string
    }

    export function response<T>(): ResponseWithNothing
    export function response<T, Code extends StatusCodes = StatusCodes.OK>(data: T, status?: Code): ResponseWithData<T, Code>
    export function response<T, Code extends StatusCodes = StatusCodes.OK>(data: T, message?: string, status?: Code): T extends undefined ? ResponseWithMessage<Code> : ResponseWithDataAndMessage<T, Code>

    export function response<T>(data?: T, message?: string, status: StatusCodes = StatusCodes.OK): unknown {
      const response: ResponseGeneric<T> = {
        type: "success",
        status: StatusCodes.OK
      }

      if (data)
        response.data = data

      if (status)
        response.status = status

      if (message)
        response.message = message

      return response
    }
  }
}

export default ServerResponse
