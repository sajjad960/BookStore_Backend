/* eslint-disable no-unused-vars */
import { PaginatedAuthors } from '../../types/dtos/AuthorDTO'
import { CreateAuthorRequest } from '../../types/requests/author/CreateAuthorRequest'
import { Author } from '../domain/entities/Author'
console.log('hello check pull request');
export interface AuthorRepositoryPort {
  createAuthor(request: CreateAuthorRequest): Promise<Author>
  getAuthorById(id: string): Promise<Author | null>
  getAllAuthors(): Promise<PaginatedAuthors | null>
}
