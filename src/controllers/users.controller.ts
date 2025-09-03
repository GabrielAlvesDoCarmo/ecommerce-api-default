import express from "express";
import {User} from "../models/user.model";
import {UserServices} from "../services/user.services";

export class UsersController {
    static async getAll(
        req: express.Request,
        res: express.Response,
    ) {
        res.status(200).send(await new UserServices().getAll())
    }

    static async getById(
        req: express.Request,
        res: express.Response,
    ) {
        res.status(200).send(await new UserServices().getByID(req.params.id))
    }

    static async save(
        req: express.Request,
        res: express.Response,
    ) {
        await new UserServices().save(req.body as User)
        res.status(201).send({
            message: "Usuario criado com sucesso"
        })
    }

    static async update(
        req: express.Request,
        res: express.Response,
    ) {
        await new UserServices().update(req.params.id, req.body as User)
        res.status(200).send({
            message: "Usuario alterado com sucesso"
        })
    }

    static async delete(
        req: express.Request,
        res: express.Response,
    ) {
        await new UserServices().delete(req.params.id)
        res.status(204).end()
    }
}