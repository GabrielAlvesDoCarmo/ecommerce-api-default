import {CategoryRepository} from "../repositories/category.repository";
import {NotFoundError} from "../errors/not-found.error";
import {CategoryModel} from "../models/category.model";
import {ProductRepository} from "../repositories/product.repository";
import {ValidationError} from "../errors/validation.error";

export class CategoryService{
    private repository: CategoryRepository
    private productRepository: ProductRepository
    constructor() {
        this.repository = new CategoryRepository()
        this.productRepository = new ProductRepository()
    }
    async getAll(): Promise<CategoryModel[]>{
        return await this.repository.getAll()
    }

    async getByID(id: string): Promise<CategoryModel> {
        const category = await this.repository.getByID(id)
        if (!category){
            throw new NotFoundError("Categoria não encontrada")
        }
        return category
    }

    async save(category: CategoryModel) {
        await this.repository.save(category)
    }

    async update(id: string, category: CategoryModel) {
        const categoryResponse = await this.repository.getByID(id)
        if (!categoryResponse){
            throw new NotFoundError("Categoria não encontrada")
        }
        categoryResponse.name = category.name
        categoryResponse.description = category.description
        categoryResponse.active = category.active
        await this.repository.update(categoryResponse)
    }

    async delete(id: string) {
        const categoryResponse = await this.repository.getByID(id)
        if (!categoryResponse){
            throw new NotFoundError("Categoria não encontrada")
        }
        const productsCount = await this.productRepository.getCountByCategory(id)
        if (productsCount !== 0){
            throw new ValidationError("Nao e possivel excluir categoria com produto cadastrado")
        }
        await this.repository.delete(id)
    }



}