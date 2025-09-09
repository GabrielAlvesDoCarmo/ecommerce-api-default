import express, {NextFunction} from "express";
import {InternalServerError} from "../errors/internal-server.error.js";
import {errors} from "celebrate";
import {ErrorBase} from "../errors/base.error.js";

export const errorHandler = (app: express.Express) => {
    app.use(errors())
    app.use((err: Error, req: express.Request, res: express.Response,next: NextFunction) => {
        console.log(err)
        if(err instanceof ErrorBase) {
            err.send(res)
        }else {
            new InternalServerError()
        }
    })
}