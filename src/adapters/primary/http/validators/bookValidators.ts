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
    body('publishedDate')
      .trim()
      .notEmpty()
      .withMessage('Published date cannot be empty')
      .isISO8601()
      .withMessage('Please enter a valid date in ISO 8601 format'),
    body('description')
      .trim()
      .isLength({ min: 2 })
      .withMessage('Description must be at least 2 characters long'),
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
