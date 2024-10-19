import httpStatus from 'http-status'
import AppError from '../../../../../utils/AppError'
import { UniqueConstraintError } from 'sequelize'

export const handleDuplicateFieldErrorSequlize = (
  err: UniqueConstraintError
) => {
  if (err instanceof UniqueConstraintError) {
    // Extract the duplicate field name from the error message
    const fields = err.fields
    let message: string
    if (Array.isArray(fields)) {
      message = `This ${fields.join(', ')} already registered.`
    } else {
      const duplicateFields = Object.entries(fields)
        .map(([fieldName]) => fieldName.split('_')[0])
        .join(',')

      message = `This ${duplicateFields} already registered.`
    }

    return new AppError(message, httpStatus.BAD_REQUEST)
  }
}
