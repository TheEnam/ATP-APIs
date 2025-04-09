import express from "express"
import { createOrderHandler, deleteOrderHandler, getOrderByIdHandler, getOrdersHandler, updateOrderHandler } from "./order.controller";

const router = express.Router();

router.post("/", createOrderHandler);
router.get("/",getOrdersHandler);
router.get("/:id",getOrderByIdHandler);
router.put("/:id",updateOrderHandler);
router.delete("/:id",deleteOrderHandler);

export {router as OrderRoutes};