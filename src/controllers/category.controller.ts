import express from "express";
import {CategoryService} from "../services/category.service.js";
import {CategoryModel} from "../models/category.model.js";

export class CategoryController{

    static async getAll(req: express.Request, res: express.Response) {
        res.status(200).send(await new CategoryService().getAll())
    }

    static async getById(req: express.Request, res: express.Response) {
        res.status(200).send(await new CategoryService().getByID(req.params.id))
    }

    static async save(req: express.Request, res: express.Response) {
        const category = req.body as CategoryModel
        await new CategoryService().save(category)
        res.status(201).send({
            message: "Categoria criada com sucesso"
        })
    }

    static async update(req: express.Request, res: express.Response) {
        const category = req.body as CategoryModel
        await new CategoryService().update(req.params.id, category)
        res.status(200).send({
            message: "Categoria atualizada com sucesso"
        })
    }

    static async delete(req: express.Request, res: express.Response) {
        await new CategoryService().delete(req.params.id)
        res.status(204).end()
    }

}