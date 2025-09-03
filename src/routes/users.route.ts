import express from "express";
import { UsersController } from "../controllers/users.controller"
import asyncHandler from 'express-async-handler'
export const userRouter = express.Router()

userRouter.get("/users", asyncHandler(UsersController.getAll))
userRouter.get("/users/:id", asyncHandler(UsersController.getById))
userRouter.post("/users", asyncHandler(UsersController.save))
userRouter.put("/users/:id", asyncHandler(UsersController.update))
userRouter.delete("/users/:id", asyncHandler(UsersController.delete))
