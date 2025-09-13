import {CategoryModel} from "./category.model.js";
import {Joi} from "celebrate";

export type Product = {
    id: string,
    name: string,
    description: string,
    price: string,
    img: string,
    category: CategoryModel,
    active: boolean
}

export const newProductSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    description: Joi.string().allow(null).default(null),
    price: Joi.number().positive().required(),
    img: Joi.string().base64().allow(null).default(null),
    category: Joi.object().keys({
        id: Joi.string().required(),
    }).required(),
    active: Joi.boolean().only().allow(true).default(true),
})

export const updateProductSchema = Joi.object().keys({
    name: Joi.string().min(3).required(),
    description: Joi.string().allow(null).default(null),
    price: Joi.number().positive().required(),
    img: Joi.alternatives().try(
        Joi.string().base64(),
        Joi.string().uri()
    ).allow(null).default(null),
    category: Joi.object().keys({
        id: Joi.string().required(),
    }).required(),
    active: Joi.boolean().required(),
})