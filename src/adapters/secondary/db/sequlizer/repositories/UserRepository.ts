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
    const userData = new UserModel({ name, email, password: hashedPassword })
    const user = await userData.save()
    return user.toJSON()
  }
  async createUserWithRole(
    name: string,
    email: string,
    password: string,
    role: Roles
  ): Promise<User> {
    const hashedPassword = await this.genarateHashedPassword(password)
    const userData = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    })
    const user = await userData.save()
    return user.toJSON()
  }

  async getUserById(id: string): Promise<User | null> {
    return UserModel.findByPk(id)
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ where: { email } })
  }

  async getAllUsers(): Promise<PaginatedUsers | null> {
    return UserModel.findAndCountAll()
  }
}
