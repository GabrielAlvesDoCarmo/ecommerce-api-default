import express from "express";
import {userRouter} from "./users.route.js"
import {authRouter} from "./auth.route.js";
import {companiesRoutes} from "./companies.route.js";
import {categoryRouter} from "./category.route.js";

export const router = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRouter)
    app.use(userRouter)
    app.use(companiesRoutes)
    app.use(categoryRouter)
}
