import express from "express";
import * as firebase from "firebase-admin"
import {initializeApp as initializeAppFirebase} from "firebase/app"
import {router} from "./routes";
import {errorHandler} from "./middlewares/error-handler.middleware";
import {pageNotFoundHandler} from "./middlewares/page-not-ffound.middleware";
import {auth} from "./middlewares/auth.middleware";


firebase.initializeApp();
initializeAppFirebase({
    apiKey: process.env.FIRE_API_KEY,
})
const app = express();
auth(app)
router(app)
pageNotFoundHandler(app)
errorHandler(app)

app.listen(3000, () => console.log("Server started on port 3000"));