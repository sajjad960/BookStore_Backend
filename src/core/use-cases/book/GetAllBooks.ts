import { BookRepository } from '../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import { BookRepositoryPort, QueryParamsAndOptions } from '../../ports/BookRepositoryPort'

export class GetAllBooks {
  private bookRepository: BookRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
  }
  async execute(query: QueryParamsAndOptions) {
    const result = await this.bookRepository.getAllBooks(query)
    return {
      books: result?.rows,
      totalBooks: result?.count,
    }
  }
}
