
import { EmailValidator } from './../protocols/email-validator'
import { Controller } from './../protocols/controller'
import { badRequest, serverError } from './../helpers/http-helpers'
import { MissingParamError, InvalidParamError } from './../errors/'
import { HttpRequest, HttpResponse } from './../protocols/http'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFildes = ['name', 'email', 'passoword', 'passowordConfirmation']
      for (const field of requiredFildes) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
