import express from "express";
import asyncHandler from 'express-async-handler'
import {celebrate, Segments} from "celebrate";
import {newOrderSchema, searchQueryOrderSchema} from "../models/order.model.js";
import {OrderController} from "../controllers/order.controller.js";
export const ordersRoute = express.Router()

ordersRoute.post("/orders",celebrate({[Segments.BODY]: newOrderSchema}),asyncHandler(OrderController.save))
ordersRoute.get("/orders",celebrate({[Segments.QUERY]: searchQueryOrderSchema}),asyncHandler(OrderController.search))