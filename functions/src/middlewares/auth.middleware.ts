import express from "express";
import {UnauthorizedError} from "../errors/unauthorizedError";
import {DecodedIdToken, getAuth} from "firebase-admin/auth";
import {UserServices} from "../services/user.services";
import {ForbiddenError} from "../errors/forbidden.error";
import {NotFoundError} from "../errors/not-found.error";

export const auth = (app: express.Express) => {
    const publicRoutes = ["/auth/login", "/auth/logout", "/auth/recovery", "/auth/anonymous", "/users"]
    app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const isPublicRoute = req.method === "POST" && publicRoutes.some(route => req.path.endsWith(route))
        if (isPublicRoute) return next()
        const token = req.headers.authorization?.split("Bearer ")[1]
        if (token) {
            try {
                const decodedIDToken: DecodedIdToken = await getAuth().verifyIdToken(token, true);
                if (decodedIDToken.firebase.sign_in_provider === "anonymous") {
                    return next()
                }
                req.user = await new UserServices().getByID(decodedIDToken.uid)
                return next()
            } catch (error) {
                if (error instanceof NotFoundError) {
                    return next(new ForbiddenError())
                } else {
                    next(new UnauthorizedError())
                }
            }
        }
        next(new UnauthorizedError())
    })
}