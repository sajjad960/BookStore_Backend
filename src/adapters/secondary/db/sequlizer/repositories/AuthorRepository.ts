import { Author } from './../../../../../core/domain/entities/Author'
import { AuthorRepositoryPort } from '../../../../../core/ports/AuthorRepositoryPort'
import AuthorModel from '../models/AuthorModel'
import { CreateAuthorRequest } from '../../../../../types/requests/author/CreateAuthorRequest'
import { PaginatedAuthors } from '../../../../../types/dtos/AuthorDTO'

export class AuthorRepository implements AuthorRepositoryPort {
  async createAuthor(request: CreateAuthorRequest): Promise<Author> {
    const { name, email } = request
    const authorData = new AuthorModel({ name, email })
    const author = await authorData.save()
    return author.toJSON()
  }

  async getAuthorById(id: string): Promise<Author | null> {
    return AuthorModel.findByPk(id, { raw: true })
  }

  async getAllAuthors(): Promise<PaginatedAuthors | null> {
    return AuthorModel.findAndCountAll()
  }
}
