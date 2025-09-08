import {ErrorBase} from "./base.error.js";

export class InternalServerError extends ErrorBase {
    constructor(message: string = "Erro interno do servidor") {
        super(500, message)
    }
}