import { Encrypter, AccountModel, AddAccount, AddAccountModel, AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassoword = await this.encrypter.encrypt(accountData.passoword)
    await this.addAccountRepository.add(Object.assign({}, accountData, { passoword: hashedPassoword }))
    return await new Promise(resolve => resolve(null))
  }
}
