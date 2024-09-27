import { RequestHandler, Router } from 'express'
import { AuthorController } from '../controllers/AuthorController'
import { protect, restrictTo } from '../middleware/auth'
import { UserRole } from '../../../secondary/db/sequlizer/models/UserModel'

const authorRouter = Router()
authorRouter.use(
  protect as unknown as RequestHandler,
  restrictTo(UserRole.ADMIN) as unknown as RequestHandler
)
authorRouter
  .route('/')
  .post(AuthorController.createAuthor as unknown as RequestHandler)
  .get(AuthorController.getAllAuthors as unknown as RequestHandler)

export default authorRouter
