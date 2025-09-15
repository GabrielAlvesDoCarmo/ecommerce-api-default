import {getFirestore} from "firebase-admin/firestore";
import {Product} from "../models/produto.model.js";
import {QuerySnapshot} from "firebase-admin/firestore";


export class ProductRepository {
    private collection

    constructor() {
        this.collection = getFirestore().collection("products")
    }

    async getAll(): Promise<Product[]> {
        const querySnapshot = await this.collection.get()
        return this.snapshotToArray(querySnapshot)
    }

    async search(categoryID: string): Promise<Product[]> {
        const snapshot = await this.collection.where("category.id", "==", categoryID).get()
        return this.snapshotToArray(snapshot)
    }

    private snapshotToArray(snapshot: QuerySnapshot): Product[] {
        return snapshot.docs.map(doc => {
            return {id: doc.id, ...doc.data()} as Product
        })
    }

    async getByID(id: string): Promise<Product> {
        const doc = await this.collection.doc(id).get()
        return {id: doc.id, ...doc.data()} as Product
    }

    async save(product: Product) {
        await this.collection.add(product)
    }

    async update(id: string, product: Product) {
        let docRef = this.collection.doc(id)
        await docRef.set({
            name: product.name,
            price: product.price,
            img: product.img,
            category: product.category,
            description: product.description,
            active: product.active
        })
    }

    async delete(id: string) {
        await this.collection.doc(id).delete()
    }

}