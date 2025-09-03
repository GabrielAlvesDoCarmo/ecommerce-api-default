import express from "express";
import * as firebase from "firebase-admin"
import { router } from "./routes";
import {errorHandler} from "./middlewares/error-handler.middleware";
import {pageNotFoundHandler} from "./middlewares/page-not-ffound.middleware";

firebase.initializeApp();
const app = express();

router(app)
pageNotFoundHandler(app)
errorHandler(app)

app.listen(3000, () => console.log("Server started on port 3000"));