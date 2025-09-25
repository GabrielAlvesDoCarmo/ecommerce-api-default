import {getFirestore} from "firebase-admin/firestore";
import {CollectionReference} from "firebase-admin/firestore";
import {Order, orderConverter, QueryParamsOrder} from "../models/order.model.js";
import dayjs from "dayjs";
import {orderItemConverter} from "../models/order-item.model.js";

export class OrderRepository {
    private collection: CollectionReference<Order>
    constructor() {
        this.collection = getFirestore().collection("orders").withConverter(orderConverter)
    }

    async save(order: Order){
        const batch = getFirestore().batch()

        const orderRef = this.collection.doc()
        batch.create(orderRef,order)

        const itemRef = orderRef.collection("items").withConverter(orderItemConverter)
        for (let item of order.items!){
            batch.create(itemRef.doc(),item)
        }



        await batch.commit()











        /* const orderRef = await this.collection.add(order)
        for (let item of order.items){
            await orderRef.collection("items").withConverter(orderItemConverter).add(item)
        }*/


    }

    async search(queryParams: QueryParamsOrder){
        let query: FirebaseFirestore.Query<Order> = this.collection;
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
        return snapshot.docs.map(doc => doc.data())
    }
}