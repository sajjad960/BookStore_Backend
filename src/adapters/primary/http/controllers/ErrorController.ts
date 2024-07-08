import httpStatus from 'http-status'
import { NextFunction } from 'express'
import { Request, Response } from 'express'
import { Error as MongooseError } from 'mongoose'
import AppError from '../../../../utils/AppError'
import {
  MongooseDuplicateKeyError,
  handleDuplicateFieldErrorMongoose,
} from './Errors/MongooseErrors'
import { Error as SequelizeError, UniqueConstraintError } from 'sequelize'
import { handleDuplicateFieldErrorSequlize } from './Errors/SequlizeErrors'

const sendErrorDev = (err: AppError, res: Response) => {
  return res.status(err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR).json({
    status: err.status ?? 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode ?? httpStatus.INTERNAL_SERVER_ERROR).json({
      status: err.status ?? 'error',
      message: err.message,
    })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Something went wrong',
    })
  }
}

const globalErrorHandler = (
  err: AppError | MongooseError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  // console.log(err instanceof SequelizeError)
  // console.log(err instanceof MongooseError)
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err as AppError, res)
  } else if (process.env.NODE_ENV === 'production') {
    // handle all mongoose errors
    if (err?.name === 'MongoServerError') {
      const mongooseErrorUniqueField = handleDuplicateFieldErrorMongoose(
        err as MongooseDuplicateKeyError
      )
      if (mongooseErrorUniqueField) {
        return sendErrorProd(mongooseErrorUniqueField, res)
      }
    }
    // handle all sequelize errors
    if (err instanceof SequelizeError) {
      const sequlizeUniqueValidationError = handleDuplicateFieldErrorSequlize(
        err as UniqueConstraintError
      )
      if (sequlizeUniqueValidationError) {
        return sendErrorProd(sequlizeUniqueValidationError, res)
      }
    }

    sendErrorProd(err as AppError, res)
  }
}

export default globalErrorHandler
