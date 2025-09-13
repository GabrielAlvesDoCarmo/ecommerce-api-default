import {ValidationError} from "../errors/validation.error.js";

export const isStorageUrlValid = (urlStr: string): boolean => {
    try {
        const url = new URL(urlStr)
        if (url.host !== "firebasestorage.googleapis.com") {
            throw new ValidationError("Url de origem invalida")
        }
        return true
    } catch (e) {
        if (e instanceof ValidationError) {
            throw e
        }
        return false
    }
}