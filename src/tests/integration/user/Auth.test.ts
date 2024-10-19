import request from 'supertest'
import { app } from '../../../server'

describe('Auth Integration Tests', () => {
  it('should register a new user', async () => {
    const response = await request(app).post('/api/v1/users/register').send({
      name: 'test',
      email: 'test455@example.com',
      password: '12345678',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toBe('success')
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
  })

  it('should return an error when registering with a duplicate email', async () => {
    // Attempt to register again with the same email
    const response = await request(app).post('/api/v1/users/register').send({
      name: 'test2',
      email: 'test455@example.com', // Same email as before
      password: '87654321',
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toBe('fail')
    expect(response.body).toHaveProperty('message')
    expect(response.body.message).toBe('This email already registered.')
  })

  it('should login a user', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      email: 'test455@example.com',
      password: '12345678',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toBe('success')
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
  })
})
