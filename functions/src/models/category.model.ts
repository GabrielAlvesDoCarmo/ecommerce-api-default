import {Joi} from "celebrate";
import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;



export class CategoryModel {
    id: string
    name: string
    description: string
    active: boolean
    constructor(data:CategoryModel | any = {}) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.active = data.active ?? true
    }
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

export const categoryConverter: FirestoreDataConverter<CategoryModel> = {
    toFirestore(category: CategoryModel): firestore.DocumentData {
        const {id, ...data} = category
        return data
    },

    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): CategoryModel {
        return new CategoryModel({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}