import {User} from "../models/user.model";
import {UserRepository} from "../repositories/user.repository";

export class UserServices {
    private userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll()
    }

    async getByID(id: string): Promise<User> {
        return this.userRepository.getByID(id)
    }

    async save(user: User) {
       return this.userRepository.save(user)
    }

    async update(id: string, user: User) {
        return this.userRepository.update(id, user)
    }

    async delete(id: string){
        return this.userRepository.delete(id)
    }
}