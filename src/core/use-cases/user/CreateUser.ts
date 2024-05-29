import { UserRepositoryPort } from '../../ports/UserRepositoryPort';
import { UserRepository } from '../../../adapters/secondary/db/mongoose/repositories/UserRepository';
import { User } from '../../domain/entities/User';

interface CreateUserRequest {
  name: string;
  email: string;
}

export class CreateUser {
  private userRepository: UserRepositoryPort;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(request: CreateUserRequest): Promise<User> {
    const { name, email } = request;
    const user = await this.userRepository.createUser(name, email);
    return new User(user.name, user.email);
  }
}
