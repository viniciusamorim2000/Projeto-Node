import { EmailValidator, AccountModel, AddAccount, AddAccountModel } from './signup-protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors/'
import { SignUpController } from './signup'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add (account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        passoword: 'valid_passoword'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'amorimhavoc@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no passoword is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'amorimhavoc@gmail.com',
        passowordConfirmation: 'any_confirmation'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passoword'))
  })

  test('Should return 400 if no passoword confirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'amorimhavoc@gmail.com',
        passoword: 'any_passoword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passowordConfirmation'))
  })

  test('Should return 400 if passoword confirmation fail', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'amorimhavoc@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passowordConfirmation'))
  })

  test('Should return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'invalid@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_passoword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'any@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_passoword'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any@gmail.com')
  })

  test('Should call AddAcount with correct values', () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'any@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_passoword'
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'Vinicius ',
      email: 'any@gmail.com',
      passoword: 'any_passoword'
    })
  })

  test('Should return 500 if EmailValidator thows', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'any@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_passoword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 500 if AddAccount thows', () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'Vinicius ',
        email: 'any@gmail.com',
        passoword: 'any_passoword',
        passowordConfirmation: 'any_passoword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
