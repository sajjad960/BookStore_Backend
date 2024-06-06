import { Router } from 'express'
import validate from '../middleware/validateRequest'
import { bookValidationRules } from '../validators/bookValidators'
import { BookController } from '../controllers/BookController'

const bookRouter = Router()

bookRouter
  .route('/')
  .post(bookValidationRules(), validate, BookController.createBook)
  .get(BookController.getAllBooks)

export default bookRouter
