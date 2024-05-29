import { User } from "../domain/entities/User";

export interface UserRepositoryPort {
  // eslint-disable-next-line no-unused-vars
  createUser(name: string, email: string): Promise<User>;
  // eslint-disable-next-line no-unused-vars
  getUserById(id: string): Promise<User | null>;
}
