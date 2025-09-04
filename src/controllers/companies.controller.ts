import express from "express";
import {CompaniesServices} from "../services/companies.services";
import {Company} from "../models/company.model";

export class CompaniesController {
    static async getAll(
        req: express.Request,
        res: express.Response,
    ) {
        res.status(200).send(await new CompaniesServices().getAll())
    }

    static async getById(
        req: express.Request,
        res: express.Response,
    ) {
        res.status(200).send(await new CompaniesServices().getByID(req.params.id))
    }

    static async save(
        req: express.Request,
        res: express.Response,
    ) {
        await new CompaniesServices().save(req.body as Company)
        res.status(201).send({
            message: "Empresa criado com sucesso"
        })
    }

    static async update(
        req: express.Request,
        res: express.Response,
    ) {
        await new CompaniesServices().update(req.params.id, req.body as Company)
        res.status(200).send({
            message: "Empresa alterada com sucesso"
        })
    }
}