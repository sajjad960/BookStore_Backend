import { AuthorRepository } from '../../../adapters/secondary/db/sequlizer/repositories/AuthorRepository'
import { Author } from '../../domain/entities/Author'

interface CreateAuthorRequest {
  name: string
  email: string
}

export class CreateAuthor {
  private authorRepository: AuthorRepository

  constructor() {
    this.authorRepository = new AuthorRepository()
  }

  async execute(request: CreateAuthorRequest): Promise<Author> {
    const { name, email } = request
    const author = await this.authorRepository.createAuthor(name, email)
    return author
  }
}
