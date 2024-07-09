import httpStatus from 'http-status'
import { CreateAuthor } from './../../../../core/use-cases/author/CreateAuthor'
import { NextFunction, Request, Response } from 'express'
import { GetAllAuthors } from '../../../../core/use-cases/author/GetAllAuthors'
import { createAuthorDTO } from '../../../../types/dtos/AuthorDTO'

export class AuthorController {
  static async createAuthor(req: Request, res: Response, next: NextFunction) {
    try {
      const createAuthorDTO: createAuthorDTO = req.body
      const createAuthor = new CreateAuthor()
      const author = await createAuthor.execute(createAuthorDTO)
      res.status(httpStatus.CREATED).json({
        status: 'success',
        author,
      })
    } catch (error) {
      next(error)
    }
  }
  static async getAllAuthors(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllAuthor = new GetAllAuthors()
      const paginatedAuthors = await getAllAuthor.execute()

      res.status(httpStatus.OK).json({
        status: 'success',
        authors: paginatedAuthors,
      })
    } catch (error) {
      next(error)
    }
  }
}
