import AppError from '../../../../../utils/AppError'
import { Error as MongooseError } from 'mongoose'

export interface MongooseDuplicateKeyError extends MongooseError {
  code: number
  keyPattern?: Record<string, number>
}
export const handleCastError = (err: MongooseError.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

export const handleValidationError = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map(
    (el: { message: string }) => el.message
  )
  const message = `Invalid input data. ${errors.join('. ')}`
  return new AppError(message, 400)
}

export const handleDuplicateFieldErrorMongoose = (
  err: MongooseDuplicateKeyError
) => {
  if (err.code === 11000 && err.keyPattern) {
    // Extract the duplicate field name from the error message
    const duplicateFields = Object.keys(err.keyPattern).join(', ')
    const message = `Duplicate field value: ${duplicateFields}. Please use another value.`

    return new AppError(message, 400)
  }
}
