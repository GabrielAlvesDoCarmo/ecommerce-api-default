import {Joi} from "celebrate";

export type User = {
    id: number;
    name: string;
    email: string;
}

export const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
})