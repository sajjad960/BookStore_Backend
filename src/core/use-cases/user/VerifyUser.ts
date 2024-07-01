import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { UserRepositoryPort } from '../../ports/UserRepositoryPort'

export class VerifyUser {
  private userRepository: UserRepositoryPort
  constructor() {
    this.userRepository = new UserRepository()
  }
  async execute(email: string) {
    const user = await this.userRepository.getUserByEmail(email)
    return user
  }
}
