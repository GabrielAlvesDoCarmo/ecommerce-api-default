import express from "express";
import asyncHandler from "express-async-handler";
import {AuthController} from "../controllers/auth.controller";

export const authRouter = express.Router()

authRouter.post("/auth/login",asyncHandler(AuthController.login))
authRouter.post("/auth/logout",asyncHandler(AuthController.logout))
