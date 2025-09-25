import express from "express";
import {userRouter} from "./users.route"
import {authRouter} from "./auth.route";
import {companiesRoutes} from "./companies.route";
import {categoryRouter} from "./category.route";
import {productRoute} from "./product.route";
import {paymentMethodRoutes} from "./payment-method.route";
import {ordersRoute} from "./orders.route";
import {allowAnonymousUser} from "../middlewares/allow-anonymous-user.middleware";

export const router = (app: express.Express) => {
    app.use(express.json({limit: "5mb"}));
    app.use(authRouter)
    app.use(allowAnonymousUser)
    app.use(userRouter)
    app.use(companiesRoutes)
    app.use(categoryRouter)
    app.use(productRoute)
    app.use(paymentMethodRoutes)
    app.use(ordersRoute)
}
