import { SignUpController } from './signup'
describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'amorimhavoc@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    sut.handle(httpRequest)
  })
})
