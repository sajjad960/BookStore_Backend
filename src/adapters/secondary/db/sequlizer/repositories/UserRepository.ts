import { User } from '../../../../../core/domain/entities/User'
import {
  PaginatedUsers,
  Roles,
  UserRepositoryPort,
} from '../../../../../core/ports/UserRepositoryPort'
import UserModel from '../models/UserModel'
import bcrypt from 'bcrypt'

export class UserRepository implements UserRepositoryPort {
  private async genarateHashedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
  }
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await this.genarateHashedPassword(password)
    const user = new UserModel({ name, email, password: hashedPassword })
    return user.save()
  }
  async createUserWithRole(
    name: string,
    email: string,
    password: string,
    role: Roles
  ): Promise<User> {
    const hashedPassword = await this.genarateHashedPassword(password)
    const user = new UserModel({ name, email, password: hashedPassword, role })
    return user.save()
  }

  async getUserById(id: string): Promise<User | null> {
    return UserModel.findByPk(id)
  }

  async getAllUsers(): Promise<PaginatedUsers | null> {
    return UserModel.findAndCountAll()
  }
}
