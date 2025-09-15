import { Joi } from "celebrate"

export type PaymentMethod = {
    id: string;
    description: string
    enabled: boolean
}

export const newPaymentMethodSchema = Joi.object().keys({
    description: Joi.string().min(3).required(),
    enabled: Joi.boolean().only().allow(true).default(true)
})

export const updatePaymentMethodSchema  = Joi.object().keys({
    description: Joi.string().min(3).required(),
    enabled: Joi.boolean().required()
})