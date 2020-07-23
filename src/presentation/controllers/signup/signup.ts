import { EmailValidator, HttpRequest, HttpResponse, Controller, AddAccount } from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helpers'
import { MissingParamError, InvalidParamError } from '../../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFildes = ['name', 'email', 'passoword', 'passowordConfirmation']
      for (const field of requiredFildes) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, passoword, passowordConfirmation } = httpRequest.body
      if (passoword !== passowordConfirmation) {
        return badRequest(new InvalidParamError('passowordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        passoword
      })
      return ok(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
