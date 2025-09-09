import {Joi} from "celebrate";

export type CategoryModel = {
    id: string,
    name: string,
    description: string,
    active: boolean
}

export const newCategorySchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    active: Joi.boolean().only().allow(true).default(true),
})

export const updateCategorySchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    active: Joi.boolean().required(),
})