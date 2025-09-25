import {Company} from "./company.model.js";
import {PaymentMethod} from "./payment-method.model.js";
import {Customer, customerSchema} from "./customer.model.js";
import {Address, orderAddressSchema} from "./address.model.js";
import {Joi} from "celebrate";
import {OrderItem, orderItemSchema} from "./order-item.model.js";
import {Timestamp, FirestoreDataConverter, FieldValue} from "firebase-admin/firestore";
import {firestore} from "firebase-admin";

export class Order {
    id: string
    company: Company;
    client: Customer;
    address: Address;
    cpfCnpjCupom: string;
    date: Date;
    isDelivery: boolean;
    paymentMethod: PaymentMethod;
    deliveryFee: number;
    items?: OrderItem[];
    status: OrderStatus;
    observation: string
    subTotal: number
    total: number
    constructor(data: any) {
        this.id = data.id;
        this.company = new Company(data.company);
        this.client = data.client;
        this.address = data.address;
        this.cpfCnpjCupom = data.cpfCnpjCupom;
        this.date = data.date instanceof Timestamp ? data.date.toDate() : data.date;
        this.isDelivery = data.isDelivery;
        this.paymentMethod = new PaymentMethod(data.paymentMethod);
        this.deliveryFee = data.deliveryFee;
        this.items = data.items?.map((item: any) => new OrderItem(item));
        this.status = data.status ?? OrderStatus.PENDING;
        this.observation = data.observation
        this.subTotal = data.subTotal
        this.total = data.total
    }

    getSubtotal(): number {
        return this.items?.map(item => item.getTotal()).reduce((total,next) => total + next,0) ?? 0
    }

    getTotal(): number {
        return this.getSubtotal() + this.deliveryFee
    }

}

export enum OrderStatus {
    PENDING = "PENDENTE",
    PROCESSING = "APROVADO",
    SHIPPED = "ENTREGA",
    DELIVERED = "CONCLUIDO",
    CANCELLED = "CANCELADO"
}

export const newOrderSchema = Joi.object().keys({
    company: Joi.object().keys({
        id: Joi.string().trim().required(),
    }).required(),
    client: customerSchema.required(),
    address: Joi.alternatives().conditional(
        "isDelivery",
        {
            is: true,
            then: orderAddressSchema.required(),
            otherwise: Joi.object().only().allow(null).default(null)
        }
    ),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(14).required(),
        Joi.string().length(11).required()
    ).default(null),
    date: Joi.date(),
    isDelivery: Joi.boolean().required(),
    paymentMethod: Joi.object().keys({
        id: Joi.string().trim().required(),
    }).required(),
    deliveryFee: Joi.number().min(0).positive().required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.PENDING).default(OrderStatus.PENDING),
    observation: Joi.string().trim().allow(null).default(null)
})

export type QueryParamsOrder = {
    companyId?: string,
    startDate?: Date,
    endDate?: Date,
    status?: OrderStatus
}

export const searchQueryOrderSchema = Joi.object().keys({
    companyId: Joi.string().trim(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
})

export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore(order: Order): firestore.DocumentData {
        return {
            company: {
                id: order.company.id,
                logo: order.company.logo,
                cpfCnpj: order.company.cpfCnpj,
                razaoSocial: order.company.razaoSocial,
                nomeFantasia: order.company.nomeFantasia,
                telefone: order.company.telefone,
                endereco: order.company.endereco,
                localizacao: order.company.localizacao
            },
            client: {
                name: order.client.name,
                phone: order.client.phone
            },
            address: {
                cep: order.address.cep,
                logradouro: order.address.logradouro,
                numero: order.address.numero,
                complemento: order.address.complemento,
                cidade: order.address.cidade,
                uf: order.address.uf
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            date: FieldValue.serverTimestamp(),
            isDelivery: order.isDelivery,
            paymentMethod: {
                id: order.paymentMethod.id,
                type: order.paymentMethod.type,
                enabled: order.paymentMethod.enabled
            },
            deliveryFee: order.deliveryFee,
            status: order.status,
            observation: order.observation,
            subTotal: order.getSubtotal(),
            total: order.getTotal(),
        }
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Order {
        return new Order({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}