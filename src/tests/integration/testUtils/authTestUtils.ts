import request from 'supertest'
import { app } from '../../../server'
import { AdminConfig } from '../../../config/config'

/**
 * Logs in as an admin and returns the admin token.
 */
export const loginAsAdmin = async (): Promise<string> => {
  const adminLoginResponse = await request(app)
    .post('/api/v1/users/login') // Adjust to your login route
    .send({
      email: AdminConfig.email, // Use a valid admin email
      password: AdminConfig.password, // Use a valid admin password
    })

  expect(adminLoginResponse.status).toBe(200)
  expect(adminLoginResponse.body).toHaveProperty('token')

  return adminLoginResponse.body.token // Return the token
}
