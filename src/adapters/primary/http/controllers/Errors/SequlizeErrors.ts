import httpStatus from 'http-status'
import AppError from '../../../../../utils/AppError'
import { UniqueConstraintError } from 'sequelize'

export const handleDuplicateFieldErrorSequlize = (
  err: UniqueConstraintError
) => {
  if (err instanceof UniqueConstraintError) {
    // Extract the duplicate field name from the error message
    const fields = err.fields
    const duplicateFields = Object.entries(fields)
      .map(([fieldName]) => fieldName.split('_')[0])
      .join(',')

    const message = `This ${duplicateFields} already registered.`

    return new AppError(message, httpStatus.BAD_REQUEST)
  }
}
