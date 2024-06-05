import { body, validationResult } from 'express-validator'
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

const userValidationRules = () => {
  return [
    body('name')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address')
      .isLength({
        min: 3,
        max: 100,
      })
      .withMessage('Email address must be between 3 and 100 characters')
      .customSanitizer((email) => {
        return email.toLowerCase()
      }),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ]
}
// const productValidationRules = () => {
//   return [
//     body('name')
//       .trim()
//       .notEmpty()
//       .isLength({ min: 2 })
//       .withMessage('Name must be at least 2 characters long'),
//     body('url').trim().notEmpty().withMessage('Please enter a valid url'),
//   ]
// }

const Validator = { userValidationRules, validate }

export = Validator
