import {getFirestore} from "firebase-admin/firestore";
import {CollectionReference} from "firebase-admin/firestore";
import {Order, QueryParamsOrder} from "../models/order.model.js";
import dayjs from "dayjs";
export class OrderRepository {
    private collection: CollectionReference
    constructor() {
        this.collection = getFirestore().collection("orders")
    }

    async save(order: Order){
        await this.collection.add(order)
    }

    async search(queryParams: QueryParamsOrder){
        let query: FirebaseFirestore.Query = this.collection;
        if (queryParams.companyId) {
           query = query.where("company.id", "==", queryParams.companyId)
        }

        if (queryParams.startDate) {
            queryParams.startDate = dayjs(queryParams.startDate).add(1,"day").startOf("day").toDate()
            query = query.where("date", ">=", queryParams.startDate)
        }

        if (queryParams.endDate) {
            queryParams.endDate = dayjs(queryParams.endDate).add(1,"day").endOf("day").toDate()
            query = query.where("date", "<=", queryParams.endDate)
        }

        if (queryParams.status) {
            query = query.where("status", "==", queryParams.status)
        }

        const snapshot = await query.get()
        return snapshot.docs.map(doc => {
            return new Order({
                id: doc.id,
                ...doc.data()
            })
        })
    }
}