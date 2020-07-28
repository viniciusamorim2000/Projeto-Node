import { adaptRoute } from './../adapters/express-routes-adapter'
import { makeSignUpController } from './../factories/signup'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
