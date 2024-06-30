import { NextFunction, Request, Response } from 'express'
import { RegisterUser } from '../../../../core/use-cases/user/RegisterUser'
import httpStatus from 'http-status'

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerUser = new RegisterUser()
      const { user, token } = await registerUser.execute(req.body)
      res.status(httpStatus.CREATED).json({
        status: 'success',
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  }
}
