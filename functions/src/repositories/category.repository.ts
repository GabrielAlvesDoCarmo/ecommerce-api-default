import {CategoryModel, categoryConverter} from "../models/category.model";
import {getFirestore} from "firebase-admin/firestore";
import {CollectionReference} from "firebase-admin/firestore";

export class CategoryRepository{
    private collection: CollectionReference<CategoryModel>
    constructor() {
        this.collection = getFirestore().collection("categories").withConverter(categoryConverter)
    }
    async getAll(): Promise<CategoryModel[]>{
        const categoriesDoc = await this.collection.get()
        return categoriesDoc.docs.map(doc => doc.data())
    }

    async getByID(id: string): Promise<CategoryModel | null> {
        const doc = await this.collection.doc(id).get()
        return doc.data() ?? null
    }

    async save(category: CategoryModel) {
       await this.collection.add(category)
    }

    async update(category: CategoryModel) {
        await this.collection.doc(category.id).set(category)

    }

    async delete(id: string) {
        await this.collection.doc(id).delete()
    }

}