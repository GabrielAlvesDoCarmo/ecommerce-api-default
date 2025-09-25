import express from "express";
import {NotFoundError} from "../errors/not-found.error";

export const pageNotFoundHandler =(app: express.Express) => {
    app.use((req: express.Request, res: express.Response,next: express.NextFunction) => {
        next(new NotFoundError("Pagina nao encontrada"))
    })
}