import express from "express";
import {OrderService} from "../services/order.service";
import {Order} from "../models/order.model";
import {QueryParamsOrder} from "../models/order.model";

export class OrderController {
    static async save(req: express.Request, res: express.Response) {
        await new OrderService().save(new Order(req.body))
        res.status(201).send({
            message: "Pedido criado com sucesso"
        })
    }

    static async search(req: express.Request, res: express.Response) {
        const orders = await new OrderService().search(req.query as QueryParamsOrder)
        res.status(200).send(orders)
    }

    static async getItems(req: express.Request, res: express.Response) {
        const items = await new OrderService().getItems(req.params.id)
        res.status(200).send(items)
    }

    static async getByID(req: express.Request, res: express.Response) {
        const order = await new OrderService().getByID(req.params.id)
        res.status(200).send(order)
    }

    static async changeStatus(req: express.Request, res: express.Response) {
        await new OrderService().changeStatus(req.params.id, req.body.status)
        res.status(200).send({
            message: "Status alterado com sucesso"
        })
    }
}