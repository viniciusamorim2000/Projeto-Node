import { HttppResponse } from './../protocols/http'
export const badRequest = (error: Error): HttppResponse => ({

  statusCode: 400,
  body: error

})
