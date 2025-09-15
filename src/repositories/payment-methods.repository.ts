import {CollectionReference, getFirestore} from "firebase-admin/firestore";
import {PaymentMethod} from "../models/payment-method.model.js";

export class PaymentMethodsRepository {

    private collection: CollectionReference

    constructor() {
        this.collection = getFirestore().collection("payment-methods")
    }

    async getAll(): Promise<PaymentMethod[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as PaymentMethod
        })
    }

    async getByID(id: string) {
        const doc = await this.collection.doc(id).get()
        if (doc.exists) {
            return {id: doc.id, ...doc.data()} as PaymentMethod
        } else {
            return null
        }
    }

    async save(paymentMethod: PaymentMethod) {
        await this.collection.add(paymentMethod)
    }

    async update(id: string, paymentMethod: PaymentMethod) {
        await this.collection.doc(id).update({
            description: paymentMethod.description,
            enabled: paymentMethod.enabled
        })
    }

    async delete(id: string) {
        await this.collection.doc(id).delete()
    }

}