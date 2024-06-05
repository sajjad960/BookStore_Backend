import { BookRepository } from './../../../adapters/secondary/db/mongoose/repositories/BookRepository'
import { Book } from '../../domain/entities/Book'
import { BookRepositoryPort } from '../../ports/BookRepositoryPort'

interface CreateBookRequest {
  title: string
  authorIds: number[]
  publishedDate: Date
  description: string
}

export class CreateBook {
  private bookRepository: BookRepositoryPort

  constructor() {
    this.bookRepository = new BookRepository()
  }

  async execute(request: CreateBookRequest): Promise<Book> {
    const { title, authorIds, publishedDate, description } = request
    const book = await this.bookRepository.createBook(
      title,
      authorIds,
      publishedDate,
      description
    )
    return book
  }
}
