import { MissingParamError } from './../errors/missing-param-error'
import { HtppResponse } from './../protocols/http'

export class SignUpController {
  handle (httpRequest: any): HtppResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
