import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'vinicius',
        email: 'vinicius@gmail.com',
        passoword: '123',
        passowordConfirmation: '123'
      })
      .expect(200)
  })
})
