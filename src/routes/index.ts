import express from "express";
import {userRouter} from "./users.route"
import {authRouter} from "./auth.route";
import {companiesRoutes} from "./companies.route";

export const router = (app: express.Express) => {
    app.use(express.json());
    app.use(authRouter)
    app.use(userRouter)
    app.use(companiesRoutes)
}
