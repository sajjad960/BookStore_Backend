import { RequestHandler, Router } from 'express'
import { AuthorController } from '../controllers/AuthorController'

const authorRouter = Router()

authorRouter
  .route('/')
  .post(AuthorController.createAuthor as unknown as RequestHandler)
  .get(AuthorController.getAllAuthors as unknown as RequestHandler)

export default authorRouter
