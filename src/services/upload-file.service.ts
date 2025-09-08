import * as fs from "node:fs";
import {getDownloadURL, getStorage} from "firebase-admin/storage";
import {fileTypeFromBuffer} from "file-type";

export class UploadFileService {
    constructor(private path: string = "") {}

    async uploadFile(base64: string): Promise<string> {
        const fileBuffer = Buffer.from(base64, "base64")
        const fileType= await fileTypeFromBuffer(fileBuffer)
        const fileName = `image.${fileType?.ext}`
        fs.writeFileSync(fileName, fileBuffer)
        const bucket = getStorage().bucket("ecommerce-api-default.firebasestorage.app")
        const uploadResponse = await bucket.upload(fileName, {
            destination: this.path + fileName
        })
        return  getDownloadURL(uploadResponse[0])
    }
}