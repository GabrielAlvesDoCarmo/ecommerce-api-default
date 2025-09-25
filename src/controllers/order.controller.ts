import express from "express";
import {OrderService} from "../services/order.service.js";
import {Order} from "../models/order.model.js";
import {QueryParamsOrder} from "../models/order.model.js";

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
}