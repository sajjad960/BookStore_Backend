import { NextFunction } from 'express'
import AppError from '../../../utils/AppError'
import { VerifyUser } from './VerifyUser'
import createSendToken from './sharedFunctions/createSendToken'

interface LoginRequest {
  email: string
  password: string
}
export class Login {
  constructor() {}

  async execute(request: LoginRequest, next: NextFunction) {
    const { email, password } = request
    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400))
    }
    const verifyUser = new VerifyUser()
    const user = await verifyUser.execute(email)
    if (!user) {
      return next(new AppError('User not found', 404))
    }
    // check password
    if (user.comparePassword) {
      const isMatch = await user.comparePassword(password)
      if (!isMatch) {
        return next(new AppError('Incorrect email or password', 403))
      }
      const token = createSendToken(user)
      return { user, token }
    } else {
      return next(new AppError('User is not valid', 403))
    }
  }
}
