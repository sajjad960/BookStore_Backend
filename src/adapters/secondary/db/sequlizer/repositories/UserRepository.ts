import { User } from '../../../../../core/domain/entities/User'
import { UserRepositoryPort } from '../../../../../core/ports/UserRepositoryPort'
import { PaginatedUsers } from '../../../../../types/dtos/UserDTO'
import { CreateUserRequest } from '../../../../../types/requests/user/CreateUserRequest'
import { CreateUserWithRoleRequest } from '../../../../../types/requests/user/CreateUserWithRoleRequests'
import UserModel from '../models/UserModel'
import bcrypt from 'bcryptjs'

export class UserRepository implements UserRepositoryPort {
  private async genarateHashedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
  }
  async createUser(request: CreateUserRequest): Promise<User> {
    const { name, email, password } = request
    const hashedPassword = await this.genarateHashedPassword(password)
    const userData = new UserModel({ name, email, password: hashedPassword })
    const user = await userData.save()
    return user.toJSON()
  }
  async createUserWithRole(request: CreateUserWithRoleRequest): Promise<User> {
    const { name, email, password, role } = request
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
