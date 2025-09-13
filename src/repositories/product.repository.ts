import {getFirestore} from "firebase-admin/firestore";
import {Product} from "../models/produto.model.js";

export class ProductRepository {
    private collection

    constructor() {
        this.collection = getFirestore().collection("products")
    }
    async getAll(): Promise<Product[]>{
        const products: Product[] = []
        const querySnapshot = await this.collection.get()
        querySnapshot.forEach((doc: any) => {
            products.push({id: doc.id, ...doc.data()})
        });
        return products
    }

    async getByID(id: string): Promise<Product> {
        const doc = await this.collection.doc(id).get()
        return {id: doc.id, ...doc.data()} as Product
    }

    async save(product: Product) {
        await this.collection.add(product)
    }

    async update(id: string, product: Product) {
        let docRef =  this.collection.doc(id)
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