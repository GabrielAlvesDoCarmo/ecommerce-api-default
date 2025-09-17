import { Joi } from "celebrate";
import {Product} from "./produto.model.js";

export type OrderItem = {
    id: string
    product: Product;
    qtd: number
    observation: string
}

export const orderItemSchema = Joi.object().keys({
    product: Joi.object().keys({
        id: Joi.string().trim().required(),
    }).required(),
    qtd: Joi.number().integer().positive().required(),
    observation: Joi.string().trim().allow(null).default(null),
})
