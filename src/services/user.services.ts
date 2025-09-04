import {User} from "../models/user.model";
import {UserRepository} from "../repositories/user.repository";
import {NotFoundError} from "../errors/not-found.error";
import {AuthService} from "./auth.service";

export class UserServices {
    // aqui fica a regra de negocio e lanca a exceção o repository so comunica
    private userRepository: UserRepository
    private authService: AuthService

    constructor() {
        this.userRepository = new UserRepository()
        this.authService = new AuthService()
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.getAll()
    }

    async getByID(id: string): Promise<User> {
        const user = this.userRepository.getByID(id)
        if (!user) {
            throw new NotFoundError("Usuario não encontrado")
        }
        // @ts-ignore
        return user
    }

    async save(user: User) {
        const userAuth =await this.authService.create(user)
        user.id = userAuth.uid
        return this.userRepository.save(user)
    }

    async update(id: string, user: User) {
        const userResponse =  await this.userRepository.getByID(id)
        if (!userResponse){
            throw new NotFoundError("Usuario não encontrado")
        }
        userResponse.name = user.name
        userResponse.email = user.email
        await this.authService.update(id, user)
        await this.userRepository.update(id, userResponse)
    }

    async delete(id: string) {
        await this.authService.delete(id)
        await this.userRepository.delete(id)
    }
}