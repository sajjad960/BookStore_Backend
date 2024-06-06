import { Book } from '../../../../../core/domain/entities/Book'
import {
  BookRepositoryPort,
  PaginateBooks,
  QueryParamsAndOptions,
} from '../../../../../core/ports/BookRepositoryPort'
import { BookModel } from '../models/BookModel'

export class BookRepository implements BookRepositoryPort {
  async createBook(
    title: string,
    authorIds: number[],
    publishedDate: Date,
    description: string,
    price: number
  ): Promise<Book> {
    const book = new BookModel({ title, authorIds, publishedDate, description, price })
    return book.save()
  }

  async getBookById(id: string): Promise<Book | null> {
    return BookModel.findById(id).exec()
  }

  async getAllBooks(query: QueryParamsAndOptions): Promise<PaginateBooks | null> {
    const { limit, skip, sort, fields, ...filters } = query

    const mongooseFilters: {[key: string]: string | number | number[] | Date | undefined} = {}

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        mongooseFilters[key] = value
      }
    }
    const [rows, count] = await Promise.all([
      BookModel.find(mongooseFilters).select(fields).
      skip(skip).
      limit(limit).
      sort(sort).
      exec(),
      BookModel.countDocuments(mongooseFilters).exec(),
    ])

    return { rows, count }
  }
}
