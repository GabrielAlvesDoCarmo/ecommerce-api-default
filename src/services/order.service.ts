import {OrderRepository} from "../repositories/order.repository.js"
import {Order, QueryParamsOrder} from "../models/order.model.js";
import {CompanyRepository} from "../repositories/company.repository.js";
import {ProductRepository} from "../repositories/product.repository.js";
import {PaymentMethodsRepository} from "../repositories/payment-methods.repository.js";
import {Company} from "../models/company.model.js";
import {PaymentMethod} from "../models/payment-method.model.js";
import {NotFoundError} from "../errors/not-found.error.js";
import {OrderItem} from "../models/order-item.model.js";

export class OrderService {
    private orderRepository: OrderRepository
    private companyRepository: CompanyRepository
    private productRepository: ProductRepository
    private paymentMethodRepository: PaymentMethodsRepository

    constructor() {
        this.orderRepository = new OrderRepository()
        this.companyRepository = new CompanyRepository()
        this.productRepository = new ProductRepository()
        this.paymentMethodRepository = new PaymentMethodsRepository()
    }

    async save(order: Order) {
        const companyResponse = await this.companyRepository.getByID(order.company.id) as Company
        if (!companyResponse) {
            throw new NotFoundError("Empresa não encontrada")
        }
        order.company = companyResponse

        const paymentResponse = await this.paymentMethodRepository.getByID(order.paymentMethod.id) as PaymentMethod
        if (!paymentResponse) {
            throw new NotFoundError("Metodo de pagamento não encontrado")
        }
        order.paymentMethod = paymentResponse

        for (let item of order.items!) {
            const productResponse = await this.productRepository.getByID(item.product.id)
            if (!productResponse) {
                throw new NotFoundError("Produto não encontrado")
            }
            item.product = productResponse
        }
        await this.orderRepository.save(order)
    }

    async search(query: QueryParamsOrder): Promise<Order[]> {
        return await this.orderRepository.search(query)
    }

    async getItems(pedidoId: string): Promise<OrderItem[]> {
       return await this.orderRepository.getItems(pedidoId)
    }

    async getByID(id: string) : Promise<Order> {
        return await this.orderRepository.getByID(id)
    }
}