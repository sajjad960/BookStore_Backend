import { ValidateAuthorsExist } from './../author/ValidateAuthorsExist'
import { BookRepository } from './../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import { Book } from '../../domain/entities/Book'
import { BookRepositoryPort } from '../../ports/BookRepositoryPort'
import { CreateBookRequest } from '../../../types/requests/book/CreateBookRequest'

export class CreateBook {
  private bookRepository: BookRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(request: CreateBookRequest): Promise<Book> {
    const { authorIds } = request
    const validateAuthorsExist = new ValidateAuthorsExist()
    await validateAuthorsExist.execute(authorIds)
    const book = await this.bookRepository.createBook(request)
    return book
  }
}
