/* eslint-disable no-unused-vars */

import { Author } from '../domain/entities/Author'

export interface PaginatedAuthors {
  rows: Author[]
  count: number
}

export interface AuthorRepositoryPort {
  createAuthor(name: string, email: string): Promise<Author>
  getAuthorById(id: string): Promise<Author | null>
  getAllAuthors(): Promise<PaginatedAuthors | null>
}
