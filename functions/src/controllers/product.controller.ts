import express from "express";
import {Product} from "../models/produto.model";
import {ProductService} from "../services/product.service";

export class ProductController {

    static async getAll(req: express.Request, res: express.Response){
        res.status(200).send(await new ProductService().getAll())
    }

    static async search(req: express.Request, res: express.Response){
        const response = await new ProductService().search(req.query.categoryId as string)
        console.log(response)
       res.status(200).send(response)
    }

    static async getById(req: express.Request, res: express.Response){
        res.status(200).send(await new ProductService().getByID(req.params.id))
    }

    static async save(req: express.Request, res: express.Response){
        const product = req.body as Product
        await new ProductService().save(product)
        res.status(201).send({
            message: "Produto criado com sucesso"
        })
    }

    static async update(req: express.Request, res: express.Response){
        const product = req.body as Product
        await new ProductService().update(req.params.id, product)
        res.status(200).send({
            message: "Produto atualizado com sucesso"
        })
    }

    static async delete(req: express.Request, res: express.Response){
        await new ProductService().delete(req.params.id)
        res.status(204).end()
    }


}