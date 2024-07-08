/* eslint-disable no-unused-vars */
import { PaginatedUsers } from '../../types/dtos/UserDTO'
import { CreateUserRequest } from '../../types/requests/CreateUserRequest'
import { CreateUserWithRoleRequest } from '../../types/requests/CreateUserWithRoleRequests'
import { User } from '../domain/entities/User'

export interface UserRepositoryPort {
  createUser(request: CreateUserRequest): Promise<User>
  createUserWithRole(request: CreateUserWithRoleRequest): Promise<User>
  getUserById(id: string): Promise<User | null>
  getAllUsers(): Promise<PaginatedUsers | null>
  getUserByEmail(email: string): Promise<User | null>
}
