import express from "express";
import { initializeApp } from "firebase-admin";
import { router } from "./routes";

initializeApp()
const app = express();

router(app)
app.listen(3000, () => console.log("Server started on port 3000"));