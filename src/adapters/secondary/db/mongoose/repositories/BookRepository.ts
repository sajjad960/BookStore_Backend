import { Book } from '../../../../../core/domain/entities/Book'
import {
  BookRepositoryPort,
  PaginateBooks,
  QueryOptions,
  QueryParams,
} from '../../../../../core/ports/BookRepositoryPort'
import { BookModel } from '../models/BookModel'

export class BookRepository implements BookRepositoryPort {
  async createBook(
    title: string,
    authorIds: number[],
    publishedDate: Date,
    description: string
  ): Promise<Book> {
    const book = new BookModel({ title, authorIds, publishedDate, description })
    return book.save()
  }

  async getBookById(id: string): Promise<Book | null> {
    return BookModel.findById(id).exec()
  }

  async getAllBooks(
    query: QueryParams,
    options: QueryOptions
  ): Promise<PaginateBooks | null> {
    // query filter
    query.status = 1
    const { limit, skip, sort, select } = options
    const [rows, count] = await Promise.all([
      BookModel.find(query)
        .limit(limit ?? 10)
        .skip(skip ?? 0)
        .sort({ createdAt: -1, ...sort })
        .select({ __v: 0, ...select })
        .exec(),
      BookModel.countDocuments(query).exec(),
    ])

    return { rows, count }
  }
}
