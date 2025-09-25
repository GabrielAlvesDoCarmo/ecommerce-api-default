import {Joi} from "celebrate";
import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;

export class Company {
    id: string
    logo: string
    cpfCnpj: string
    razaoSocial: string
    nomeFantasia?: string
    telefone: string
    horarioFuncionamento: string
    endereco: string
    localizacao: string
    taxaEntrega: string
    ativa: boolean

    constructor(data: Company | any) {
        this.id = data.id;
        this.logo = data.logo
        this.cpfCnpj = data.cpfCnpj
        this.razaoSocial = data.razaoSocial
        this.nomeFantasia = data.nomeFantasia
        this.telefone = data.telefone
        this.horarioFuncionamento = data.horarioFuncionamento
        this.endereco = data.endereco
        this.localizacao = data.localizacao
        this.taxaEntrega = data.taxaEntrega
        this.ativa = data.ativa ?? true
    }
}

export const newCompanySchema = Joi.object().keys({
    logo: Joi.string().base64().required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(14).required(),
        Joi.string().length(11).required()
    ).required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string(),
    telefone: Joi.string().regex(/^(?:[1-9]{2}9\d{8}|[1-9]{2}[2-9]\d{7})$/).required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().only().allow(true).default(true),
})

export const updateCompanySchema = Joi.object().keys({
    logo: Joi.alternatives().try(
        Joi.string().allow(null).required(),
        Joi.string().base64().required()
    ).required(),
    cpfCnpj: Joi.alternatives().try(
        Joi.string().length(14).required(),
        Joi.string().length(11).required()
    ).required(),
    razaoSocial: Joi.string().required(),
    nomeFantasia: Joi.string(),
    telefone: Joi.string().regex(/^(?:[1-9]{2}9\d{8}|[1-9]{2}[2-9]\d{7})$/).required(),
    horarioFuncionamento: Joi.string().required(),
    endereco: Joi.string().required(),
    localizacao: Joi.string().required(),
    taxaEntrega: Joi.number().required(),
    ativa: Joi.boolean().required(),
})

export const companyConverter: FirestoreDataConverter<Company> = {
    toFirestore(company: Company): firestore.DocumentData {
        const {id, ...data} = company
        return data
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Company {
        return new Company({
            id: snapshot.id,
            ...snapshot.data()
        })
    }

}