/* eslint-disable no-unused-vars */
import { Book } from '../domain/entities/Book'

export interface PaginateBooks {
  rows: Book[]
  count: number
}
export interface QueryParamsAndOptions {
  limit: number
  skip: number
  sort: string,
  title?: string
  authorIds?: number[]
  publishedDate?: Date
  description?: string
  status?: number
  fields: string
}

export interface BookRepositoryPort {
  createBook(
    title: string,
    authorIds: number[],
    publishedDate: Date,
    description: string
  ): Promise<Book>
  getBookById(id: string): Promise<Book | null>
  getAllBooks(query: QueryParamsAndOptions): Promise<PaginateBooks | null>
}
