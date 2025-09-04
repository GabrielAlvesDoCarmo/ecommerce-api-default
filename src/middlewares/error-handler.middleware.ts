import express from "express";
import {InternalServerError} from "../errors/internal-server.error";
import {errors} from "celebrate";
import {ErrorBase} from "../errors/base.error";

export const errorHandler = (app: express.Express) => {
    app.use(errors())
    app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(err)
        if(err instanceof ErrorBase) {
            err.send(res)
        }else {
            new InternalServerError()
        }
    })
}