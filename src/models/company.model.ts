import {Joi} from "celebrate";

export type Company = {
    id: string
    logo?: string
    cpfCnpj: string
    razaoSocial: string
    nomeFantasia?: string
    telefone: string
    horarioFuncionamento: string
    endereco: string
    localizacao: string
    taxaEntrega?: string
    ativa: boolean
}

export const newCompanySchema = Joi.object().keys({
    logo: Joi.string(),
    cpfCnpj: Joi.string().required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string(),
    telefone: Joi.string().required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.string(),
    ativa: Joi.boolean().required(),
})