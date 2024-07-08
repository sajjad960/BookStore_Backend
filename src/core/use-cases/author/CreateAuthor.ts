import { AuthorRepository } from '../../../adapters/secondary/db/sequlizer/repositories/AuthorRepository'
import { CreateAuthorRequest } from '../../../types/requests/author/CreateAuthorRequest'
import { Author } from '../../domain/entities/Author'

export class CreateAuthor {
  private authorRepository: AuthorRepository

  constructor() {
    this.authorRepository = new AuthorRepository()
  }

  async execute(request: CreateAuthorRequest): Promise<Author> {
    const author = await this.authorRepository.createAuthor(request)
    return author
  }
}
