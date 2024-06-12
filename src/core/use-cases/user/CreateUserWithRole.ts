import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { User } from '../../domain/entities/User'
import { Roles, UserRepositoryPort } from '../../ports/UserRepositoryPort'

interface CreateUserWithRoleRequest {
  name: string
  email: string
  password: string
  role: Roles
}

export class CreateUserWithRole {
  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(request: CreateUserWithRoleRequest): Promise<User> {
    const { name: newName, email: newEmail, password, role } = request
    const user = await this.userRepository.createUserWithRole(
      newName,
      newEmail,
      password,
      role
    )
    return user
  }
}
