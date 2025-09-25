import { Joi } from "celebrate"

export type Customer = {
    id: string,
    name: string,
    phone: string
}

export const customerSchema = Joi.object().keys({
    name: Joi.string().trim().min(5).required(),
    phone: Joi.string().regex(/^(?:[1-9]{2}9\d{8}|[1-9]{2}[2-9]\d{7})$/).required(),
})