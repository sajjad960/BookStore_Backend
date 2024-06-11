import { AuthorRepository } from '../../../adapters/secondary/db/sequlizer/repositories/AuthorRepository'
import { AuthorRepositoryPort } from '../../ports/AuthorRepositoryPort'
export class GetAllAuthors {
  private authorRepository: AuthorRepositoryPort

  constructor() {
    this.authorRepository = new AuthorRepository()
  }
  async execute() {
    const result = await this.authorRepository.getAllAuthors()
    return {
      authors: result?.rows,
      totalAuthors: result?.count,
    }
  }
}
