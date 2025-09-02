import express from "express";

type User = {
    id: number;
    name: string;
    email: string;
}

let id = 0
let usuarios: User[] = []

export class UsersController {
    static getAll(req: express.Request, res: express.Response) {
        res.status(200).send(usuarios)
    }

    static getById(req: express.Request, res: express.Response) {
        let userID = Number(req.params.id)
        let user = usuarios.find(user => user.id == userID)
        res.send(user);
    }

    static save(req: express.Request, res: express.Response) {
        let reqUsers = req.body
        reqUsers.id = ++id;
        usuarios.push(reqUsers)
        res.send({
            message: "Usuario adicionado com sucesso"
        })
    }

    static update(req: express.Request, res: express.Response) {
        let userID = Number(req.params.id)
        let userChange = req.body
        let indexOf = usuarios.findIndex((_user: User) => _user.id === userID);
        usuarios[indexOf].name = userChange.name
        usuarios[indexOf].email = userChange.email
        res.send({
            message: "Usuario alterado com sucesso"
        })
    }

    static delete(req: express.Request, res: express.Response) {
        let userID = Number(req.params.id)
        let indexOf = usuarios.findIndex(user => user.id === userID)
        usuarios.splice(indexOf, 1)
        res.send({
            message: "Usuario deletado"
        })
    }
}