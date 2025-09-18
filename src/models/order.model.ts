import {Company} from "./company.model.js";
import {PaymentMethod} from "./payment-method.model.js";
import {Customer, customerSchema} from "./customer.model.js";
import {Address, orderAddressSchema} from "./address.model.js";
import {Joi} from "celebrate";
import {OrderItem, orderItemSchema} from "./order-item.model.js";
import {Timestamp} from "firebase-admin/firestore";

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
    items: OrderItem[];
    status: OrderStatus;
    constructor(data: any) {
        this.id = data.id;
        this.company = data.company;
        this.client = data.client;
        this.address = data.address;
        this.cpfCnpjCupom = data.cpfCnpjCupom;
        this.date = data.date instanceof Timestamp ? data.date.toDate() : data.date;
        this.isDelivery = data.isDelivery;
        this.paymentMethod = data.paymentMethod;
        this.deliveryFee = data.deliveryFee;
        this.items = data.items;
        this.status = data.status;
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
