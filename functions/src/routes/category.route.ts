import express from "express";
import asyncHandler from "express-async-handler";
import {celebrate, Segments} from "celebrate";
import {CategoryController} from "../controllers/category.controller";
import {newCategorySchema, updateCategorySchema} from "../models/category.model";

export const categoryRouter = express.Router()

categoryRouter.get("/categories",asyncHandler(CategoryController.getAll))
categoryRouter.get("/categories/:id",asyncHandler(CategoryController.getById))
categoryRouter.post("/categories",celebrate({[Segments.BODY]: newCategorySchema}),asyncHandler(CategoryController.save))
categoryRouter.put("/categories/:id",celebrate({[Segments.BODY]: updateCategorySchema}),asyncHandler(CategoryController.update))
categoryRouter.delete("/categories/:id",asyncHandler(CategoryController.delete))
