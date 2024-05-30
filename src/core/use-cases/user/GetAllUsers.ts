import { UserRepositoryPort } from '../../ports/UserRepositoryPort';
import { UserRepository } from './../../../adapters/secondary/db/mongoose/repositories/UserRepository';
export class GetAllUsers {
    private userRepository: UserRepositoryPort;

    constructor(){
        this.userRepository = new UserRepository()
    }
    async execute(){
        const users = await this.userRepository.getAllUsers();
        return users;
    }
}