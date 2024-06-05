import { validationResult } from 'express-validator'
import { NextFunction } from 'express'
import { Request } from 'express'
import { Response } from 'express'

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors: { [key: string]: string }[] = []
  errors
    .array()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((err: any) => {
      extractedErrors.push({ [err.path]: err.msg })
    })

  res.status(422).json({
    errors: extractedErrors,
  })
}

export default validate
