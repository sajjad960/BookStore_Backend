/* eslint-disable no-unused-vars */
import { User } from '../domain/entities/User'

export interface PaginatedUsers {
  rows: User[]
  count: number
}
export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export interface UserRepositoryPort {
  createUser(name: string, email: string, password: string): Promise<User>
  createUserWithRole(
    name: string,
    email: string,
    password: string,
    role: Roles
  ): Promise<User>
  getUserById(id: string): Promise<User | null>
  getAllUsers(): Promise<PaginatedUsers | null>
  getUserByEmail(email: string): Promise<User | null>
}
