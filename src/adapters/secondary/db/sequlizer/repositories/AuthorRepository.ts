import { Author } from './../../../../../core/domain/entities/Author'
import {
  AuthorRepositoryPort,
  PaginatedAuthors,
} from '../../../../../core/ports/AuthorRepositoryPort'
import AuthorModel from '../models/AuthorModel'

export class AuthorRepository implements AuthorRepositoryPort {
  async createAuthor(name: string, email: string): Promise<Author> {
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
