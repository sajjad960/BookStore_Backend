import httpStatus from 'http-status'
import { GetAllBooks } from '../../../../core/use-cases/book/GetAllBooks'
import { CreateBook } from './../../../../core/use-cases/book/CreateBook'
import { Request, Response, NextFunction } from 'express'
import { CreateBookDTO } from '../../../../types/dtos/BookDTO'

export class BookController {
  static async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const createBookDTO: CreateBookDTO = req.body
      // console.log(req.files.poster, audio)
      // const audioFileInfo = (req.files as { audio?: IFile[] })['audio']?.[0]
      // const posterFileInfo = (req.files as { poster?: IFile[] })['poster']?.[0]

      // console.log(audioFileInfo, posterFileInfo)

      const createBook = new CreateBook()
      const book = await createBook.execute(createBookDTO)
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
