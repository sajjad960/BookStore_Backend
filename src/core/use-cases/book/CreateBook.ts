import { BookRepository } from './../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import { Book } from '../../domain/entities/Book'
import { BookRepositoryPort } from '../../ports/BookRepositoryPort'
import { AuthorRepositoryPort } from '../../ports/AuthorRepositoryPort'
import { AuthorRepository } from '../../../adapters/secondary/db/sequlizer/repositories/AuthorRepository'
import AppError from '../../../utils/AppError'
import httpStatus from 'http-status'

interface CreateBookRequest {
  title: string
  authorIds: number[]
  publishedDate: Date
  description: string
  price: number
}

export class CreateBook {
  private bookRepository: BookRepositoryPort
  private authorRepository: AuthorRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
    this.authorRepository = new AuthorRepository()
  }

  async execute(request: CreateBookRequest): Promise<Book> {
    const { title, authorIds, publishedDate, description, price } = request

    const authorsDetails = await Promise.all(
      authorIds.map((authorId) =>
        this.authorRepository.getAuthorById(String(authorId))
      )
    )
    const isAuthorsExist = authorsDetails.every((author) => author !== null)
    if (!isAuthorsExist) {
      throw new AppError(
        'One or more authors does not exist',
        httpStatus.NOT_FOUND
      )
    }
    const book = await this.bookRepository.createBook(
      title,
      authorIds,
      publishedDate,
      description,
      price
    )
    return book
  }
}
