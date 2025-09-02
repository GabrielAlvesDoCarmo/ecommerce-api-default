import express from "express";
import {userRouter} from "./users.route"

export const router = (app: express.Express) => {
    app.use(express.json());
    app.use(userRouter)
}
