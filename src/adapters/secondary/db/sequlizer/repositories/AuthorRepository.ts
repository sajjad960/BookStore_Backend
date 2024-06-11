import { Author } from './../../../../../core/domain/entities/Author'
import {
  AuthorRepositoryPort,
  PaginatedAuthors,
} from '../../../../../core/ports/AuthorRepositoryPort'
import AuthorModel from '../models/AuthorModel'

export class AuthorRepository implements AuthorRepositoryPort {
  async createAuthor(name: string, email: string): Promise<Author> {
    const author = new AuthorModel({ name, email })
    return author.save()
  }

  async getAuthorById(id: string): Promise<Author | null> {
    return AuthorModel.findByPk(id, { raw: true })
  }

  async getAllAuthors(): Promise<PaginatedAuthors | null> {
    return AuthorModel.findAndCountAll()
  }
}
