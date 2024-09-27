import { RequestHandler, Router } from 'express'
import validate from '../middleware/validateRequest'
import {
  bookQueryValidationRules,
  bookValidationRules,
} from '../validators/bookValidators'
import { BookController } from '../controllers/BookController'
import upload from '../middleware/upload'
import { protect, restrictTo } from '../middleware/auth'
import { UserRole } from '../../../secondary/db/sequlizer/models/UserModel'

const bookRouter = Router()

bookRouter
  .route('/')
  .post(
    protect as unknown as RequestHandler,
    restrictTo(UserRole.ADMIN) as unknown as RequestHandler,
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
