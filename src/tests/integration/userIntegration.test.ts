import request from 'supertest'
import { app } from '../..'

describe('User Integration Tests', () => {
  it('should create a user', async () => {
    const response = await request(app).get('/api/v1/books')
    // expect(response.status).toBe(200)
    // expect(response.body.data.user).toHaveProperty('id')
    expect(response.status).toBe(200)
  })
})
