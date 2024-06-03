import { NextFunction } from 'express';
import { Request, Response } from 'express'
import { Error as MongooseError } from 'mongoose'
import AppError from '../../../../utils/AppError'

interface MongooseDuplicateKeyError extends MongooseError {
  code: number
  keyPattern?: Record<string, number>
}

const sendErrorDev = (err: AppError, res: Response) => {
  return res.status(err.statusCode ?? 500).json({
    status: err.status ?? "error",
    error: err,
    message: err.message,
    stack: err.stack,
  })
}

const handleDuplicateFieldError = (err: MongooseDuplicateKeyError) => {
    if (err.code === 11000 && err.keyPattern) {
    // Extract the duplicate field name from the error message
    const duplicateFields = Object.keys(err.keyPattern).join(', ')
    const message = `Duplicate field value: ${duplicateFields}. Please use another value.`

    return new AppError(message, 400)
  }
}

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode ?? 500).json({
      status: err.status ?? "error",
      message: err.message,
    })
  } else {
    res.status(500).json({
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
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err as AppError, res)
  } else if (process.env.NODE_ENV === 'production') {    
    if (err?.name === "MongoServerError") {
      const mongooseError = handleDuplicateFieldError(
        err as MongooseDuplicateKeyError
      )
      if (mongooseError) {
        return sendErrorProd(mongooseError, res)
      }
    }
    sendErrorProd(err as AppError, res)
  }
}

export default globalErrorHandler
