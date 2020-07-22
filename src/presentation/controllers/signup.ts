import { Controller } from './../protocols/controller'
import { badRequest } from './../helpers/http-helpers'
import { MissingParamError } from './../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFildes = ['name', 'email', 'passoword', 'passowordConfirmation']
    for (const field of requiredFildes) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
