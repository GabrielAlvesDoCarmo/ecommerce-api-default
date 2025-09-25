import {CollectionReference, getFirestore} from "firebase-admin/firestore";
import {Product, productConverter} from "../models/produto.model.js";
import {QuerySnapshot} from "firebase-admin/firestore";


export class ProductRepository {
    private collection: CollectionReference<Product>

    constructor() {
        this.collection = getFirestore().collection("products").withConverter(productConverter)
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

    async getByID(id: string): Promise<Product | null> {
        const doc = await this.collection.doc(id).get()
        return doc.data() ?? null
    }

    async save(product: Product) {
        await this.collection.add(product)
    }

    async update(product: Product) {
        await this.collection.doc(product.id).set(product)
    }

    async delete(id: string) {
        await this.collection.doc(id).delete()
    }

    async getCountByCategory(categoryID:string) : Promise<number>{
        const snapshot = await this.collection.where("category.id", "==", categoryID).count().get()
       return snapshot.data().count
    }
}