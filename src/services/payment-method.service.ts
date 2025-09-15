import {PaymentMethodsRepository} from "../repositories/payment-methods.repository.js";
import {PaymentMethod} from "../models/payment-method.model.js";
import {NotFoundError} from "../errors/not-found.error.js";

export class PaymentMethodService{
    private repository: PaymentMethodsRepository
    constructor() {
        this.repository = new PaymentMethodsRepository()
    }

    async getAll(): Promise<PaymentMethod[]> {
        return await this.repository.getAll()
    }

    async getByID(id: string): Promise<PaymentMethod> {
        const paymentMethod = await this.repository.getByID(id)
        if (!paymentMethod) {
            throw new NotFoundError("Método de pagamento não encontrado")
        }
        return paymentMethod
    }

    async save(paymentMethod: PaymentMethod) {
        await this.repository.save(paymentMethod)
    }

    async update(id: string, paymentMethod: PaymentMethod) {
        const paymentMethodResponse = await this.repository.getByID(id)
        if (!paymentMethodResponse) {
            throw new NotFoundError("Método de pagamento não encontrado")
        }
        await this.repository.update(id, paymentMethod)
    }

    async delete(id: string) {
        const paymentMethodResponse = await this.repository.getByID(id)
        if (!paymentMethodResponse) {
            throw new NotFoundError("Método de pagamento não encontrado")
        }
        await this.repository.delete(id)
    }

}
