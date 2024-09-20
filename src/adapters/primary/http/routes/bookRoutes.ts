import { RequestHandler, Router } from 'express'
import validate from '../middleware/validateRequest'
import {
  bookQueryValidationRules,
  bookValidationRules,
} from '../validators/bookValidators'
import { BookController } from '../controllers/BookController'
import upload from '../middleware/upload'

const bookRouter = Router()

bookRouter
  .route('/')
  .post(
    upload,
    bookValidationRules(),
    validate as unknown as RequestHandler,
    BookController.createBook as unknown as RequestHandler
  )
  .get(
    bookQueryValidationRules(),
    validate as unknown as RequestHandler,
    BookController.getAllBooks as unknown as RequestHandler
  )

export default bookRouter
