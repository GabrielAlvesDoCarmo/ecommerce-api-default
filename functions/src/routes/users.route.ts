import express from "express";
import {UsersController} from "../controllers/users.controller"
import asyncHandler from 'express-async-handler'
import {celebrate, Segments} from "celebrate";
import {newUserSchema, updateUserSchema} from "../models/user.model";

export const userRouter = express.Router()

userRouter.get("/users", asyncHandler(UsersController.getAll))
userRouter.get("/users/:id", asyncHandler(UsersController.getById))
userRouter.post("/users", celebrate({[Segments.BODY]: newUserSchema}), asyncHandler(UsersController.save))
userRouter.put("/users/:id", celebrate({[Segments.BODY]: updateUserSchema}), asyncHandler(UsersController.update))
userRouter.delete("/users/:id", asyncHandler(UsersController.delete))

