import { NextFunction, Request, Response } from 'express'
import { RegisterUser } from '../../../../core/use-cases/user/RegisterUser'
import httpStatus from 'http-status'
import { LoginUser } from '../../../../core/use-cases/user/LoginUser'

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
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginUser = new LoginUser()
      const { user, token } = await loginUser.execute(req.body)
      res.status(httpStatus.OK).json({
        status: 'success',
        user,
        token,
      })
    } catch (error) {
      next(error)
    }
  }
}
