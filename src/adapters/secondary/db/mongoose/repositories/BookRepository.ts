import { Author } from '../../../../../core/domain/entities/Author'
import { Book } from '../../../../../core/domain/entities/Book'
import { BookRepositoryPort } from '../../../../../core/ports/BookRepositoryPort'
import {
  BookQueryParamsAndOptions,
  PaginateBooks,
} from '../../../../../types/dtos/BookDTO'
import { CreateBookRequest } from '../../../../../types/requests/book/CreateBookRequest'
import AuthorModel from '../../sequlizer/models/AuthorModel'
import { BookModel } from '../models/BookModel'

export class BookRepository implements BookRepositoryPort {
  async createBook(request: CreateBookRequest): Promise<Book> {
    const { title, authorIds, publishedDate, description, price } = request
    const book = new BookModel({
      title,
      authorIds,
      publishedDate,
      description,
      price,
    })
    return book.save()
  }

  async getBookById(id: string): Promise<Book | null> {
    return BookModel.findById(id).exec()
  }

  async getAllBooks(
    query: BookQueryParamsAndOptions
  ): Promise<PaginateBooks | null> {
    const { limit, skip, sort, fields, ...filters } = query

    const mongooseFilters: {
      [key: string]: string | number | number[] | Date | undefined
    } = {}

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        mongooseFilters[key] = value
      }
    }
    const [rows, count] = await Promise.all([
      BookModel.find(mongooseFilters)
        .select(fields)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec(),
      BookModel.countDocuments(mongooseFilters).exec(),
    ])

    // Get authors for each book and add them to the book object
    const authorIds = rows.flatMap(({ authorIds }) => authorIds)
    // Get authors from the mysql database
    const authors = await AuthorModel.findAll({
      where: {
        id: authorIds,
      },
      raw: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    const authorMap = new Map<number, Author>()
    authors.forEach((author) => {
      authorMap.set(author?.id, author)
    })

    const newRows = rows.map((book) => {
      const authors = book.authorIds.map((authorId: number) => {
        return authorMap.get(Number(authorId))
      })
      return { ...book.toObject(), authors }
    })
    return { rows: newRows, count }
  }
}
