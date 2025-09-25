import express from "express";
import asyncHandler from 'express-async-handler'
import {celebrate, Segments} from "celebrate";
import {PaymentMethodController} from "../controllers/payment-method.controller";
import {newPaymentMethodSchema, updatePaymentMethodSchema} from "../models/payment-method.model";

export const paymentMethodRoutes = express.Router()

paymentMethodRoutes.get("/payment-methods", asyncHandler(PaymentMethodController.getAll))
paymentMethodRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodController.getById))
paymentMethodRoutes.post("/payment-methods", celebrate({[Segments.BODY]: newPaymentMethodSchema}), asyncHandler(PaymentMethodController.save))
paymentMethodRoutes.put("/payment-methods/:id",celebrate({[Segments.BODY]: updatePaymentMethodSchema}), asyncHandler(PaymentMethodController.update))
paymentMethodRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodController.delete))