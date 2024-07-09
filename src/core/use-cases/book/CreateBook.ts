import { BookRepository } from './../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import { Book } from '../../domain/entities/Book'
import { BookRepositoryPort } from '../../ports/BookRepositoryPort'
import { AuthorRepositoryPort } from '../../ports/AuthorRepositoryPort'
import { AuthorRepository } from '../../../adapters/secondary/db/sequlizer/repositories/AuthorRepository'
import AppError from '../../../utils/AppError'
import httpStatus from 'http-status'
import { CreateBookRequest } from '../../../types/requests/book/CreateBookRequest'

export class CreateBook {
  private bookRepository: BookRepositoryPort
  private authorRepository: AuthorRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
    this.authorRepository = new AuthorRepository()
  }

  async execute(request: CreateBookRequest): Promise<Book> {
    const { authorIds } = request
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
    const book = await this.bookRepository.createBook(request)
    return book
  }
}
