import express from "express"
import { createOrderHandler, getOrderByIdHandler, getOrdersHandler, updateOrderHandler } from "./order.controller";

const router = express.Router();

router.post("/", createOrderHandler);
router.get("/",getOrdersHandler);
router.get("/:id",getOrderByIdHandler);
router.put("/:id",updateOrderHandler);
router.delete("/:id",createOrderHandler);

export {router as OrderRoutes};