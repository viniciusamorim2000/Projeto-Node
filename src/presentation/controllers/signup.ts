import { badRequest } from './../helpers/http-helpers'
import { MissingParamError } from './../errors/missing-param-error'
import { HttppResponse } from './../protocols/http'

export class SignUpController {
  handle (httpRequest: any): HttppResponse {
    const requiredFildes = ['name', 'email', 'passoword']
    for (const field of requiredFildes) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
