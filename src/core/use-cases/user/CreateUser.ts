import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { CreateUserRequest } from '../../../types/requests/user/CreateUserRequest'
import { User } from '../../domain/entities/User'
import { UserRepositoryPort } from '../../ports/UserRepositoryPort'

export class CreateUser {
  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(request: CreateUserRequest): Promise<User> {
    const user = await this.userRepository.createUser(request)
    return user
  }
}
