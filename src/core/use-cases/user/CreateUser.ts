import { UserRepositoryPort } from '../../ports/UserRepositoryPort'
import { UserRepository } from '../../../adapters/secondary/db/mongoose/repositories/UserRepository'
import { User } from '../../domain/entities/User'

interface CreateUserRequest {
  name: string
  email: string,
  password: string
}

export class CreateUser {
  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(request: CreateUserRequest): Promise<User> {
    const { name: newName, email: newEmail, password } = request
    const user = await this.userRepository.createUser(newName, newEmail, password)
    const { name, email, role, active } = user
    return {
      name,
      email,
      role,
      active
    }
  }
}
