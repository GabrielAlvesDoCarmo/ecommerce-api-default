import {ErrorBase} from "./base.error.js";

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(message: string = "O e-mail informado ja esta em uso por outra conta ") {
        super(409, message);
    }
}