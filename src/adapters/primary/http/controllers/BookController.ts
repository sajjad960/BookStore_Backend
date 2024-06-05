import { CreateBook } from './../../../../core/use-cases/book/CreateBook'
import { NextFunction, Request, Response } from 'express'

export class BookController {
  static async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, authorIds, publishedDate, description } = req.body
      const createBook = new CreateBook()
      const book = await createBook.execute({
        title,
        authorIds,
        publishedDate,
        description,
      })
      res.status(201).json({
        status: 'success',
        book,
      })
    } catch (error) {
      next(error)
    }
  }
  //   static async getAllBook(req: Request, res: Response) {
  //     const getAllB = new GetAllUsers()
  //     const users = await getAllUser.execute()

  //     res.status(200).json({
  //       status: 'success',
  //       users,
  //     })
  //   }
}
