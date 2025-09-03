import express from "express";
import * as firebase from "firebase-admin"
import { router } from "./routes";

firebase.initializeApp();
const app = express();

router(app)
app.listen(3000, () => console.log("Server started on port 3000"));