import express from "express";
import {UnauthorizedError} from "../errors/unauthorizedError";
import {DecodedIdToken, getAuth} from "firebase-admin/auth";

export const auth = (app: express.Express) => {
    app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.method === "POST" && (req.url.startsWith("/auth/login") || req.url.startsWith("/auth/logout"))) {
            return next()
        }
        const token = req.headers.authorization?.split("Bearer ")[1]
        if (token) {
            try {
                const decodedIDToken: DecodedIdToken = await getAuth().verifyIdToken(token, true);
                console.log(decodedIDToken)
                return next()
            } catch (error) {
                next(new UnauthorizedError())
            }
        }
        next(new UnauthorizedError())
    })
}