import { UserRole } from '../../../adapters/secondary/db/sequlizer/models/UserModel'
import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository'
import { User } from '../../domain/entities/User'
import { UserRepositoryPort } from '../../ports/UserRepositoryPort'

interface CreateUserWithRoleRequest {
  name: string
  email: string
  password: string
  role: UserRole
}

export class CreateUserWithRole {
  private userRepository: UserRepositoryPort

  constructor() {
    this.userRepository = new UserRepository()
  }

  async execute(request: CreateUserWithRoleRequest): Promise<User> {
    const user = await this.userRepository.createUserWithRole(request)
    return user
  }
}
