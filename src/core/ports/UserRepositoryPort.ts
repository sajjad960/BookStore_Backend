/* eslint-disable no-unused-vars */
import { User } from "../domain/entities/User";

export interface UserRepositoryPort {
  createUser(name: string, email: string, password: string): Promise<User>;
  getUserById(id: string): Promise<User | null>;
  getAllUsers(): Promise<User[] | null>;
}
