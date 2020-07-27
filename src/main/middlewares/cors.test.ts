import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_body_cors')
      .expect('acess-control-allow-origin', '*')
      .expect('acess-control-allow-method', '*')
      .expect('acess-control-allow-headers', '*')
  })
})
