import { AuthorRepositoryPort } from '../../ports/AuthorRepositoryPort'
import AppError from '../../../utils/AppError'
import httpStatus from 'http-status'
import { AuthorRepository } from '../../../adapters/secondary/db/sequlizer/repositories/AuthorRepository'

export class ValidateAuthorsExist {
  private authorRepository: AuthorRepositoryPort

  constructor() {
    this.authorRepository = new AuthorRepository()
  }

  async execute(authorIds: number[]): Promise<void> {
    const authorsDetails = await Promise.all(
      authorIds.map((authorId) =>
        this.authorRepository.getAuthorById(String(authorId))
      )
    )
    const isAuthorsExist = authorsDetails.every((author) => author !== null)

    if (!isAuthorsExist) {
      throw new AppError(
        'One or more authors does not exist',
        httpStatus.NOT_FOUND
      )
    }
  }
}
