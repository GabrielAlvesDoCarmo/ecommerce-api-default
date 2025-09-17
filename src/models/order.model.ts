import {Company} from "./company.model.js";
import {PaymentMethod} from "./payment-method.model.js";
import {Customer, customerSchema} from "./customer.model.js";
import {Address, orderAddressSchema} from "./address.model.js";
import {Joi} from "celebrate";
import {OrderItem, orderItemSchema} from "./order-item.model.js";

export type Order = {
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
    date: Joi.date().default(() => new Date()),
    isDelivery: Joi.boolean().required(),
    paymentMethod: Joi.object().keys({
        id: Joi.string().trim().required(),
    }).required(),
    deliveryFee: Joi.number().min(0).positive().required(),
    items: Joi.array().min(1).items(orderItemSchema).required(),
    status: Joi.string().only().allow(OrderStatus.PENDING).default(OrderStatus.PENDING),

})