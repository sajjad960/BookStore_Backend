import { body } from 'express-validator'

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
const userLoginValidationRules = () => {
  return [
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

const Validator = { userValidationRules, userLoginValidationRules }

export = Validator
