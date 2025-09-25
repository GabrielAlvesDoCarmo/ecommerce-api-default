import { Joi } from "celebrate";
import {Product} from "./produto.model.js";
import {FirestoreDataConverter} from "firebase-admin/firestore";
import {firestore} from "firebase-admin";

export class OrderItem  {
    id: string
    product: Product;
    qtd: number
    observation: string
    constructor(data: OrderItem | any) {
        this.id = data.id
        this.product = new Product(data.product)
        this.qtd = data.qtd
        this.observation = data.observation
    }

    getTotal(): number {
        return this.product.price * this.qtd
    }
}

export const orderItemSchema = Joi.object().keys({
    product: Joi.object().keys({
        id: Joi.string().trim().required(),
    }).required(),
    qtd: Joi.number().integer().positive().required(),
    observation: Joi.string().trim().allow(null).default(null),
})

export const orderItemConverter: FirestoreDataConverter<OrderItem> = {
    toFirestore(item: OrderItem): firestore.DocumentData{
        return {
            product: {
                id: item.product.id,
                name: item.product.name,
                description: item.product.description,
                price: item.product.price,
                img: item.product.img,
                category: {
                    id: item.product.category.id,
                    name: item.product.category.name,
                    description: item.product.category.description
                }
            },
            qtd: item.qtd,
            observation: item.observation,
        }
    },

    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): OrderItem {
        return new OrderItem({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}
