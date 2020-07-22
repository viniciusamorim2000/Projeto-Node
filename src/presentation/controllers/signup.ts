import { badRequest } from './../helpers/http-helpers'
import { MissingParamError } from './../errors/missing-param-error'
import { HttppResponse } from './../protocols/http'

export class SignUpController {
  handle (httpRequest: any): HttppResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
