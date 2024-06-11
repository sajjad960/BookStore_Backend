import { CreateAuthor } from './../../../../core/use-cases/author/CreateAuthor'
import { NextFunction, Request, Response } from 'express'
import { GetAllAuthors } from '../../../../core/use-cases/author/GetAllAuthors'

export class AuthorController {
  static async createAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body
      const createAuthor = new CreateAuthor()
      const author = await createAuthor.execute({ name, email })
      res.status(201).json({
        status: 'success',
        author,
      })
    } catch (error) {
      next(error)
    }
  }
  static async getAllAuthors(req: Request, res: Response) {
    const getAllAuthor = new GetAllAuthors()
    const authors = await getAllAuthor.execute()

    res.status(200).json({
      status: 'success',
      authors,
    })
  }
}
