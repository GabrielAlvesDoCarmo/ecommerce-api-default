import express from "express";
import firebase from "firebase-admin"
import {initializeApp as initializeAppFirebase} from "firebase/app"
import {router} from "./routes";
import {errorHandler} from "./middlewares/error-handler.middleware";
import {pageNotFoundHandler} from "./middlewares/page-not-ffound.middleware";
import {auth} from "./middlewares/auth.middleware";
import {onRequest} from "firebase-functions/v1/https";


firebase.initializeApp();
initializeAppFirebase({
    apiKey: process.env.FIRE_API_KEY,
})
const app = express();
auth(app)
router(app)
pageNotFoundHandler(app)
errorHandler(app)

export const api = onRequest(app)