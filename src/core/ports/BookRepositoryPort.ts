/* eslint-disable no-unused-vars */
import { Book } from '../domain/entities/Book'

export interface PaginateBooks {
  rows: Book[]
  count: number
}
export interface QueryOptions {
  limit?: number
  skip?: number
  sort?: Record<number, 1 | -1>
  select?: Record<number, 1 | 0>
}

export interface QueryParams {
  title?: string
  authorIds?: number[]
  publishedDate?: Date
  description?: string
  status?: number
}

export interface BookRepositoryPort {
  createBook(
    title: string,
    authorIds: number[],
    publishedDate: Date,
    description: string
  ): Promise<Book>
  getBookById(id: string): Promise<Book | null>
  getAllBooks(
    query: QueryParams,
    options: QueryOptions
  ): Promise<PaginateBooks | null>
}
