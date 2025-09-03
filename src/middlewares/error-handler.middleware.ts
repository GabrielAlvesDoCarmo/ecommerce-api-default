import express from "express";
import {ValidationError} from "../errors/validation.error";
import {InternalServerError} from "../errors/internal-server.error";
import {NotFoundError} from "../errors/not-found.error";
import {errors} from "celebrate";

export const errorHandler = (app: express.Express) => {
    app.use(errors())
    app.use((err: Error, req: express.Request, res: express.Response) => {
        if(err instanceof ValidationError) {
            err.send(res)
        }else if (err instanceof NotFoundError){
            err.send(res)
        } else {
            new InternalServerError()
        }

    })
}