import {getFirestore} from "firebase-admin/firestore";
import {Company} from "../models/company.model.js";
import {CollectionReference} from "firebase-admin/firestore";

export class CompanyRepository {
    private collection: CollectionReference

    constructor() {
        this.collection = getFirestore().collection("companies")
    }
    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get()
        // @ts-ignore
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as Company[]
    }

    async getByID(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get()
        if (doc.exists) {
            return {
                id: doc.id,
                ...doc.data()
            } as Company;
        } else {
            return null
        }
    }

    async save(company: Company) {
        await this.collection.add(company)
    }

    async update(id: string, company: Company) {
        let docRef = this.collection.doc(id)
        await docRef.set(company)
    }

}