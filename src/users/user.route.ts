import express from "express"
import { getUserHandler } from "./user.controller";


const router = express.Router();

router.get("/", getUserHandler);

export {router as userRoutes};