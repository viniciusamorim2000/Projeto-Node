
import { EmailValidator, HttpRequest, HttpResponse, Controller } from './../protocols/'
import { badRequest, serverError } from './../helpers/http-helpers'
import { MissingParamError, InvalidParamError } from './../errors/'

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
      const { email, passoword, passowordConfirmation } = httpRequest.body
      if (passoword !== passowordConfirmation) {
        return badRequest(new InvalidParamError('passowordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
