import express from "express";
import { UnauthorizedError } from "../errors/unauthorizedError";
import {DecodedIdToken, getAuth} from "firebase-admin/auth";
import { UserServices } from "../services/user.services";
import { ForbiddenError } from "../errors/forbidden.error";

export const auth = (app: express.Express) => {
    const publicRoutes = ["/auth/login", "/auth/logout", "/auth/recovery"]
    app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const isPublicRoute = req.method === "POST" && publicRoutes.some(route =>req.path.startsWith(route))
        if (isPublicRoute) return next()
        const token = req.headers.authorization?.split("Bearer ")[1]
        if (token) {
            try {
                const decodedIDToken: DecodedIdToken = await getAuth().verifyIdToken(token, true);
                const user = await new UserServices().getByID(decodedIDToken.uid)
                if (!user){
                    return next(new ForbiddenError())
                }
                req.user = user
                return next()
            } catch (error) {
                next(new UnauthorizedError())
            }
        }
        next(new UnauthorizedError())
    })
}