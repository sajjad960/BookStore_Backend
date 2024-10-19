import request from 'supertest'
import { app } from '../../../server'
export const authorsTests = () => {
  it('should create a new author', async () => {
    const response = await request(app).post('/api/v1/authors').send({
      name: 'test author',
      email: 'testAuthor@example.com',
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('status')
    expect(response.body.status).toBe('success')
    expect(response.body).toHaveProperty('author')
  })
}
