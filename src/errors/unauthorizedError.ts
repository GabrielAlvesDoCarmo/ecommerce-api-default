import {ErrorBase} from "./base.error.js";

export class UnauthorizedError extends ErrorBase {
    constructor(message: string = "Não autorizado") {
        super(401,message);
    }
}