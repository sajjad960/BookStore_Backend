/* eslint-disable no-unused-vars */
import {
  BookQueryParamsAndOptions,
  PaginateBooks,
} from '../../types/dtos/BookDTO'
import { CreateBookRequest } from '../../types/requests/book/CreateBookRequest'
import { Book } from '../domain/entities/Book'

export interface BookRepositoryPort {
  createBook(request: CreateBookRequest): Promise<Book>
  getBookById(id: string): Promise<Book | null>
  getAllBooks(query: BookQueryParamsAndOptions): Promise<PaginateBooks | null>
}
