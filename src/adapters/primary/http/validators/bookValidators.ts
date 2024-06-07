import { body, query } from 'express-validator'

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return authorIds?.map((authorId: any) => Number(authorId))
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
const bookQueryValidationRules = () => {
  return [
    query('limit')
      .optional()
      .isInt({ gt: 0 })
      .withMessage('Limit must be a positive integer'),
    query('skip')
      .optional()
      .isInt({ gt: 0 })
      .withMessage('Skip must be a positive integer'),
    query('sort')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Sort must be a non-empty string'),
    query('title')
      .optional()
      .isString()
      .withMessage('Title must be a string'),
      query('authorIds')
      .optional()
      .isString()
      .matches(/^(\d+,)*\d+$/)
      .withMessage('authorIds must be a comma-separated string of numbers'),
    query('publishedDate')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Published Date must be a valid date'),
    query('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    query('price')
      .optional()
      .isFloat({ gt: 0 })
      .withMessage('Price must be a positive number'),
    query('fields')
      .optional()
      .isString()
      .notEmpty()
      .withMessage('Fields must be a non-empty string')
  ];
};
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

const Validator = { bookValidationRules, bookQueryValidationRules }

export = Validator
