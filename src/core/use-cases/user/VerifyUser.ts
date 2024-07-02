import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { User } from '../../domain/entities/User'
import { UserRepositoryPort } from '../../ports/UserRepositoryPort'

export class VerifyUser {
  private userRepository: UserRepositoryPort
  constructor() {
    this.userRepository = new UserRepository()
  }
  async execute(email: string): Promise<User | null> {
    const user = await this.userRepository.getUserByEmail(email)
    return user
  }
}
