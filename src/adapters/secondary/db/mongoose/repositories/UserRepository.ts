import { User } from '../../../../../core/domain/entities/User'
import { UserRepositoryPort } from '../../../../../core/ports/UserRepositoryPort'
import { UserModel } from '../models/UserModel'

export class UserRepository implements UserRepositoryPort {
  async createUser(name: string, email: string): Promise<User> {
    const user = new UserModel({ name, email })
    return user.save()
  }

  async getUserById(id: string): Promise<User | null> {
    return UserModel.findById(id).exec()
  }

  async getAllUsers(): Promise<User[] | null> {
    return UserModel.find()
  }
}
