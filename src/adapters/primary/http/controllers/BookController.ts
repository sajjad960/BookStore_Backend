import httpStatus from 'http-status'
import { GetAllBooks } from '../../../../core/use-cases/book/GetAllBooks'
import { CreateBook } from './../../../../core/use-cases/book/CreateBook'
import { Request, Response, NextFunction } from 'express'

export class BookController {
  static async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, authorIds, publishedDate, description, price } = req.body
      const createBook = new CreateBook()
      const book = await createBook.execute({
        title,
        authorIds,
        publishedDate,
        description,
        price,
      })
      res.status(httpStatus.CREATED).json({
        status: 'success',
        book,
      })
    } catch (error) {
      next(error)
    }
  }
  static async getAllBooks(req: Request, res: Response) {
    const getAllBook = new GetAllBooks()

    const { books, totalBooks } = await getAllBook.execute(req)
    res.status(httpStatus.OK).json({
      status: 'success',
      books,
      totalBooks,
    })
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
