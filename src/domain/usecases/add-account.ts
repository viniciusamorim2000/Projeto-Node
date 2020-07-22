import { AccountModel } from './../models/account'

export interface AddAccountModel {
  name: string
  email: string
  passoword: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
