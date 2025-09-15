import express from "express";
import asyncHandler from "express-async-handler";
import {celebrate, Segments} from "celebrate";
import {newProductSchema, searchQuerySchema, updateProductSchema} from "../models/produto.model.js";
import {ProductController} from "../controllers/product.controller.js";

export const productRoute = express.Router()

productRoute.get("/products",asyncHandler(ProductController.getAll))
productRoute.get("/products/search",celebrate({[Segments.QUERY]: searchQuerySchema}),asyncHandler(ProductController.search))
productRoute.get("/products/:id",asyncHandler(ProductController.getById))
productRoute.post("/products",celebrate({[Segments.BODY]: newProductSchema}),asyncHandler(ProductController.save))
productRoute.put("/products/:id",celebrate({[Segments.BODY]: updateProductSchema}),asyncHandler(ProductController.update))
productRoute.delete("/products/:id",asyncHandler(ProductController.delete))