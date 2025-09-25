import { Joi } from "celebrate"
import {firestore} from "firebase-admin";
import FirestoreDataConverter = firestore.FirestoreDataConverter;
import DocumentData = firestore.DocumentData;

export class PaymentMethod {
    id: string
    type: PaymentMethodType
    enabled: boolean
    constructor(data: PaymentMethod | any) {
        this.id = data.id
        this.type = data.description
        this.enabled = data.enabled ?? true
    }
}

export enum PaymentMethodType {
    PIX = "PIX",
    CC = "Cartão de Crédito",
    CD = "Cartão de Débito",
    BOLETO = "Boleto",
}

export const newPaymentMethodSchema = Joi.object().keys({
    description: Joi.string().only().allow(PaymentMethodType.PIX).default(PaymentMethodType.PIX),
    enabled: Joi.boolean().only().allow(true).default(true)
})

export const updatePaymentMethodSchema  = Joi.object().keys({
    description: Joi.string().only().allow(PaymentMethodType.PIX).default(PaymentMethodType.PIX),
    enabled: Joi.boolean().required()
})

export const paymentMethodConverter: FirestoreDataConverter<PaymentMethod> = {
    toFirestore(paymentMethod: PaymentMethod): DocumentData {
        const {id, ...data} = paymentMethod
        return data
    },

    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): PaymentMethod {
        return new PaymentMethod({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}