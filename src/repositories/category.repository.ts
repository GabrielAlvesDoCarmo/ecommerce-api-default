import {CategoryModel} from "../models/category.model.js";
import {firestore} from "firebase-admin";
import CollectionReference = firestore.CollectionReference;
import {getFirestore} from "firebase-admin/firestore";

export class CategoryRepository{
    private collection: CollectionReference
    constructor() {
        this.collection = getFirestore().collection("categories")
    }
    async getAll(): Promise<CategoryModel[]>{
        const categoriesDoc = await this.collection.get()
        return categoriesDoc.docs.map(doc => doc.data() as CategoryModel)
    }

    async getByID(id: string): Promise<CategoryModel> {
        const categoryRef = this.collection.doc(id)
        const categoryDoc = await categoryRef.get()
        return categoryDoc.data() as CategoryModel
    }

    async save(category: CategoryModel) {
        const categoryRef = this.collection.doc()
        category.id = categoryRef.id
        await categoryRef.set(category)
    }

    async update(id: string, category: CategoryModel) {
        const categoryRef = this.collection.doc(id)
        await categoryRef.update({
            name: category.name,
            description: category.description,
            active: category.active
        })
    }

    async delete(id: string) {
        const categoryRef = this.collection.doc(id)
        await categoryRef.delete()
    }

}