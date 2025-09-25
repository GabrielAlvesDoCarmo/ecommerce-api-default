import express from "express";
import {PaymentMethodService} from "../services/payment-method.service";

export class PaymentMethodController {
    static async getAll(req: express.Request, res: express.Response) {
        res.send(await new PaymentMethodService().getAll())
    }

    static async getById(req: express.Request, res: express.Response) {
        res.send(await new PaymentMethodService().getByID(req.params.id))
    }

    static async save(req: express.Request, res: express.Response) {
        await new PaymentMethodService().save(req.body)
        res.status(201).send({
            message: "Método de pagamento criado com sucesso"
        })
    }

    static async update(req: express.Request, res: express.Response){
        await new PaymentMethodService().update(req.params.id, req.body)
        res.status(200).send({
            message: "Método de pagamento alterado com sucesso"
        })

    }

    static async delete(req: express.Request, res: express.Response) {
        await new PaymentMethodService().delete(req.params.id)
        res.status(204).end()
    }

}