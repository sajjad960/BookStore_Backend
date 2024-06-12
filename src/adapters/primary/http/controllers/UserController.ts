import httpStatus from 'http-status'
import { NextFunction, Request, Response } from 'express'
import { CreateUser } from '../../../../core/use-cases/user/CreateUser'
import { GetAllUsers } from '../../../../core/use-cases/user/GetAllUsers'

export class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body
      const createUser = new CreateUser()
      const user = await createUser.execute({ name, email, password })
      res.status(httpStatus.CREATED).json({
        status: 'success',
        user,
      })
    } catch (error) {
      next(error)
    }
  }
  static async getAllUsers(req: Request, res: Response) {
    const getAllUser = new GetAllUsers()
    const users = await getAllUser.execute()

    res.status(httpStatus.OK).json({
      status: 'success',
      users,
    })
  }
}
