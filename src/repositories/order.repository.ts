import {getFirestore} from "firebase-admin/firestore";
import {CollectionReference} from "firebase-admin/firestore";
import {Order, orderConverter, OrderStatus, QueryParamsOrder} from "../models/order.model.js";
import dayjs from "dayjs";
import {OrderItem, orderItemConverter} from "../models/order-item.model.js";
import {NotFoundError} from "../errors/not-found.error.js";

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

    async getItems(pedidoId: string): Promise<OrderItem[]> {
        const pedidoRef = this.collection.doc(pedidoId)
        const snapshot = await pedidoRef.collection("items").withConverter(orderItemConverter).get()
        return snapshot.docs.map(doc => doc.data())

    }

    async getByID(id: string) : Promise<Order> {
        const order =  (await this.collection.doc(id).get()).data()
         if (!order) {
             throw new NotFoundError("Pedido não encontrado")
         }
         order.items = await this.getItems(id)
        return order
    }


    async changeStatus(id: string, status: OrderStatus) {
        await this.collection
            .withConverter(null)
            .doc(id)
            .set({status: status}, {merge: true})
    }
}