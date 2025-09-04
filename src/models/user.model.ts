import {Joi} from "celebrate";

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string
    imageProfile?: string
}

export const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    imageProfile: Joi.string(),
})

export const authLoginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
})