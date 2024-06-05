import { body } from 'express-validator'

const bookValidationRules = () => {
  return [
    body('title')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Book title must be at least 2 characters long'),
    body('authorIds')
      .trim()
      .isArray()
      .withMessage('Please enter a valid array of author ids')
      .customSanitizer((authorIds) => {
        return authorIds.map((authorId: number) => Number(authorId))
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

const Validator = { bookValidationRules }

export = Validator
