import {CategoryModel} from "./category.model";
import {Joi} from "celebrate";
import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;

export class Product {
    id: string
    name: string
    description: string
    price: number
    img: string
    category: CategoryModel
    active: boolean

    constructor(data: Product | any) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.price = data.price
        this.img = data.img
        this.category = new CategoryModel(data.category)
        this.active = data.active ?? true
    }
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

export const searchQuerySchema = Joi.object().keys({
    categoryId: Joi.string().required()
})

export const productConverter: FirestoreDataConverter<Product> = {
    toFirestore(product: Product): firestore.DocumentData {
        const {id, ...data} = product
        return data
    },

    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Product {
        return new Product({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}