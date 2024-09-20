import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { UserRepositoryPort } from '../../ports/UserRepositoryPort'
export class GetSingleUser {
  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepository()
  }
  async execute(id: string) {
    const user = await this.userRepository.getUserById(id)
    return user
  }
}
