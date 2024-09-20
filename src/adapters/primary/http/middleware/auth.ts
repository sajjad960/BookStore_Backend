import { NextFunction, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../../../../config/config'
import AppError from '../../../../utils/AppError'
import httpStatus from 'http-status'
import { MyUserRequest } from '../../../../types/express/express'
import { GetSingleUser } from '../../../../core/use-cases/user/GetSingleUser'

const protect = async (
  req: MyUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Getting token and check of it's there
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      throw new AppError(
        "You are not log in! Please log in to get access'",
        httpStatus.UNAUTHORIZED
      )
    }

    // Verify token
    const decoded: JwtPayload | string = jwt.verify(token, jwtConfig.secret)
    if (typeof decoded === 'string') {
      throw new AppError('Invalid token', httpStatus.UNAUTHORIZED)
    }
    // Check if user still exists
    const getUser = new GetSingleUser()
    const user = await getUser.execute(decoded?.id)
    if (!user) {
      throw new AppError('User not found', httpStatus.NOT_FOUND)
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const restrictTo =
  (...roles: string[]) =>
  (req: MyUserRequest, res: Response, next: NextFunction) => {
    const { user } = req
    if (user && !roles.includes(user.role)) {
      throw new AppError(
        'You do not have permission to perform this action',
        httpStatus.FORBIDDEN
      )
    }
    next()
  }

export { protect, restrictTo }
