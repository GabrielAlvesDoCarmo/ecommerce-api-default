import {Product} from "../models/produto.model.js";
import {NotFoundError} from "../errors/not-found.error.js";
import {ProductRepository} from "../repositories/product.repository.js";
import {CategoryRepository} from "../repositories/category.repository.js";
import {UploadFileService} from "./upload-file.service.js";
import {isStorageUrlValid} from "../utils/validation-utils.js";

export class ProductService {
    private repository: ProductRepository
    private categoryRepository: CategoryRepository
    private uploadFileService: UploadFileService;

    constructor() {
        this.repository = new ProductRepository()
        this.categoryRepository = new CategoryRepository()
        this.uploadFileService = new UploadFileService("images/products")
    }

    async getAll(): Promise<Product[]> {
        return await this.repository.getAll()
    }

    async search(categoryID: string){
        return await this.repository.search(categoryID)
    }

    async getByID(id: string): Promise<Product> {
        const product = await this.repository.getByID(id)
        if (!product) {
            throw new NotFoundError("Produto não encontrado")
        }
        return product
    }

    async save(product: Product) {
        product.category = await this.getCategoryByID(product.category.id)
        if (product.img) {
            product.img = await this.uploadFileService.uploadFile(product.img)
        }
        await this.repository.save(product)
    }

    async update(id: string, product: Product) {
        const productResponse = await this.repository.getByID(id)
        if (!productResponse) {
            throw new NotFoundError("Produto não encontrado")
        }
        if (product.img && !isStorageUrlValid(product.img)) {
            product.img = await this.uploadFileService.uploadFile(product.img)
        }

        productResponse.name = product.name
        productResponse.description = product.description
        productResponse.category = await this.getCategoryByID(product.category.id)
        productResponse.img = product.img
        productResponse.price = product.price
        productResponse.active = product.active
        await this.repository.update(productResponse)
    }

    async delete(id: string) {
        const productResponse = await this.repository.getByID(id)
        if (!productResponse) {
            throw new NotFoundError("Produto não encontrado")
        }
        await this.repository.delete(id)
    }

    private async getCategoryByID(categoryId: string) {
        const categoryModel = await this.categoryRepository.getByID(categoryId)
        if (!categoryModel) {
            throw new NotFoundError("Categoria nao cadastrada")
        }
        return categoryModel
    }

}