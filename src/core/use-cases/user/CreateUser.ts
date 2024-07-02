import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { User } from '../../domain/entities/User'
import { UserRepositoryPort } from '../../ports/UserRepositoryPort'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

export class CreateUser {
  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(request: CreateUserRequest): Promise<User> {
    const { name: newName, email: newEmail, password } = request
    const user = await this.userRepository.createUser(
      newName,
      newEmail,
      password
    )
    return user
  }
}
