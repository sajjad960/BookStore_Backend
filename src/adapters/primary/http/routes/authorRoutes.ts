import { Router } from 'express'
import { AuthorController } from '../controllers/AuthorController'

const authorRouter = Router()

authorRouter
  .route('/')
  .post(AuthorController.createAuthor)
  .get(AuthorController.getAllAuthors)

export default authorRouter
