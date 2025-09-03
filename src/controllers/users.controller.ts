import express from "express";
import {getFirestore} from "firebase-admin/firestore";
import {ValidationError} from "../errors/validation.error";
import {NotFoundError} from "../errors/not-found.error";

type User = {
    id: number;
    name: string;
    email: string;
}

export class UsersController {
    static async getAll(
        req: express.Request,
        res: express.Response,
    ) {
        const snapshot = await getFirestore().collection("users").get()
        const users = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        res.status(200).send(users)
    }

    static async getById(
        req: express.Request,
        res: express.Response,
    ) {
        let userID = req.params.id
        const doc = await getFirestore().collection("users").doc(userID).get()
        if (doc.exists) {
            res.status(200).send({
                id: doc.id,
                ...doc.data()
            });
        } else {
            throw new NotFoundError("Usuario não encontrado")
        }
    }

    static async save(
        req: express.Request,
        res: express.Response,
    ) {
        let reqUsers = req.body
        if (!reqUsers.email || reqUsers.email?.length === 0) {
            throw new ValidationError("Email obrigatorio")
        }
        if (!reqUsers.name || reqUsers.name?.length === 0) {
            throw new ValidationError("Nome obrigatorio")
        }
        const userSave = await getFirestore().collection("users").add(reqUsers)
        res.status(201).send({
            message: `Usuario adicionado com sucesso ID: ${userSave.id}`
        })
    }

    static async update(
        req: express.Request,
        res: express.Response,
    ) {
        let userID = req.params.id
        let userChange = req.body as User
        let docRef = getFirestore().collection("users").doc(userID)
        if ((await docRef.get()).exists) {
            if (!userChange.email || userChange.email?.length === 0) {
                throw new ValidationError("Email obrigatorio")
            }
            if (!userChange.name || userChange.name?.length === 0) {
                throw new ValidationError("Nome obrigatorio")
            }
            await docRef.set({
                name: userChange.name,
                email: userChange.email
            })
            res.status(200).send({
                message: "Usuario alterado com sucesso"
            })
        } else {
            throw new NotFoundError("Usuario não encontrado")
        }
    }

    static async delete(
        req: express.Request,
        res: express.Response,
    ) {
        let userID = req.params.id
        await getFirestore().collection("users").doc(userID).delete()
        res.status(204).end()
    }
}