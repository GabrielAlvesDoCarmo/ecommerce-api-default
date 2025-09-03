import express from "express";
import {getFirestore} from "firebase-admin/firestore";

type User = {
    id: number;
    name: string;
    email: string;
}

export class UsersController {
    static async getAll(
        req: express.Request,
        res: express.Response
    ) {
        try {
            const snapshot = await getFirestore().collection("users").get()
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            res.status(200).send(users)
        }catch (e) {
            res.status(500).send({ message:"Erro interno do servidor"})
        }
    }

    static async getById(
        req: express.Request,
        res: express.Response
    ) {
        try {
            let userID = req.params.id
            const doc = await getFirestore().collection("users").doc(userID).get()
            res.status(200).send({
                id: doc.id,
                ...doc.data()
            });
        }catch (e) {
            res.status(500).send({ message:"Erro interno do servidor"})
        }
    }

    static async save(
        req: express.Request,
        res: express.Response
    ) {
        try {
            let reqUsers = req.body
            const userSave = await getFirestore().collection("users").add(reqUsers)
            res.status(201).send({
                message: `Usuario adicionado com sucesso ID: ${userSave.id}`
            })
        }catch (e) {
            res.status(500).send({ message:"Erro interno do servidor"})
        }
    }

    static async update(
        req: express.Request,
        res: express.Response
    ) {
        try {
            let userID = req.params.id
            let userChange = req.body as User
            await getFirestore().collection("users").doc(userID).set({
                name: userChange.name,
                email: userChange.email
            })
            res.status(200).send({
                message: "Usuario alterado com sucesso"
            })
        }catch (e) {
            res.status(500).send({ message:"Erro interno do servidor"})
        }
    }

    static async delete(req: express.Request, res: express.Response) {
        try {
            let userID = req.params.id
            await getFirestore().collection("users").doc(userID).delete()
            res.status(204).end()
        }catch (e) {
            res.status(500).send({ message:"Erro interno do servidor"})
        }
    }
}