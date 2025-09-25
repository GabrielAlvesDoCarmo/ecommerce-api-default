import {getFirestore} from "firebase-admin/firestore";
import {Company, companyConverter} from "../models/company.model";
import {CollectionReference} from "firebase-admin/firestore";

export class CompanyRepository {
    private collection: CollectionReference<Company>

    constructor() {
        this.collection = getFirestore()
            .collection("companies")
            .withConverter(companyConverter)
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => doc.data())
    }

    async getByID(id: string): Promise<Company | null> {
        const doc = await this.collection.doc(id).get()
        return doc.data() ?? null
    }

    async save(company: Company) {
        await this.collection.add(company)
    }

    async update(id: string, company: Company) {
        await this.collection.doc(id).set(company)

    }

}