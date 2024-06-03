import { UserRepository } from '../../../adapters/secondary/db/sequlizer/repositories/UserRepository';
import { UserRepositoryPort } from '../../ports/UserRepositoryPort';
export class GetAllUsers {
    private userRepository: UserRepositoryPort;

    constructor(){
        this.userRepository = new UserRepository()
    }
    async execute(){
        const result = await this.userRepository.getAllUsers();
        return {
            users: result?.rows,
            totalUsers: result?.count
        };
    }
}