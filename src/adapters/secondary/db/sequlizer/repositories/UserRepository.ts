import { User } from '../../../../../core/domain/entities/User'
import {
  PaginatedUsers,
  Roles,
  UserRepositoryPort,
} from '../../../../../core/ports/UserRepositoryPort'
import UserModel from '../models/UserModel'

export class UserRepository implements UserRepositoryPort {
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = new UserModel({ name, email, password })
    return user.save()
  }
  async createUserWithRole(
    name: string,
    email: string,
    password: string,
    role: Roles
  ): Promise<User> {
    const user = new UserModel({ name, email, password, role })
    return user.save()
  }

  async getUserById(id: string): Promise<User | null> {
    return UserModel.findByPk(id)
  }

  async getAllUsers(): Promise<PaginatedUsers | null> {
    return UserModel.findAndCountAll()
  }
}
