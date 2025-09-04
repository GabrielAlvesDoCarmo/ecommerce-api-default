import express from "express";
import {AuthService} from "../services/auth.service";

export class AuthController {
    static async login(
        req: express.Request,
        res: express.Response,
    ) {
        const {email, password} = req.body
        const userCredential = await new AuthService().login(email, password)
        const token = await userCredential.user.getIdToken(true)
        res.status(200).send({
            message: "Login realizado com sucesso",
            token: token,
        })
    }

    static async logout(req: express.Request, res: express.Response){
        await new AuthService().logout()
        res.status(204).end()
    }

}