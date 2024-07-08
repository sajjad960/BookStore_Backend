import httpStatus from 'http-status'
import { GetAllBooks } from '../../../../core/use-cases/book/GetAllBooks'
import { CreateBook } from './../../../../core/use-cases/book/CreateBook'
import { Request, Response, NextFunction } from 'express'
// src/types/IFile.ts

// Define the IFile type
export type IFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  location: string
  buffer: Buffer
  size: number
}

declare module 'express' {
  interface Request {
    files: IFile[]
  }
}

export class BookController {
  static async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, authorIds, publishedDate, description, price } = req.body
      // console.log(req.files.poster, audio)
      // const audioFileInfo = (req.files as { audio?: IFile[] })['audio']?.[0]
      // const posterFileInfo = (req.files as { poster?: IFile[] })['poster']?.[0]

      // console.log(audioFileInfo, posterFileInfo)

      const createBook = new CreateBook()
      const book = await createBook.execute({
        title,
        authorIds,
        publishedDate,
        description,
        price,
        // audioLinks: {
        //   url: audioFileInfo?.location,
        //   type: audioFileInfo?.mimetype,
        // },
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
