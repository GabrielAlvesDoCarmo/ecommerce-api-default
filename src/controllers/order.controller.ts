import express from "express";
import {OrderService} from "../services/order.service.js";
import {Order} from "../models/order.model.js";

export class OrderController {
    static async save(req: express.Request, res: express.Response) {
        await new OrderService().save(req.body as Order)
        res.status(201).send({
            message: "Pedido criado com sucesso"
        })
    }
}