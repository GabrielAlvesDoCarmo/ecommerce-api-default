import {ErrorBase} from "./base.error";

export class ValidationError extends ErrorBase {
    constructor(message: string = "Erro de validação") {
        super(400, message)
    }
}