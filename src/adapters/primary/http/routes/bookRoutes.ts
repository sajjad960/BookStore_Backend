import { Router } from 'express'
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
  .post(upload, bookValidationRules(), validate, BookController.createBook)
  .get(bookQueryValidationRules(), validate, BookController.getAllBooks)

export default bookRouter
