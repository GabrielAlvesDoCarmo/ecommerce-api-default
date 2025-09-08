import {ErrorBase} from "./base.error.js";

export class ValidationError extends ErrorBase {
    constructor(message: string = "Erro de validação") {
        super(400, message)
    }
}