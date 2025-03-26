import express from 'express';
import { createTransferHandler } from './transfer.controller';

const router = express.Router();

router.post("/", createTransferHandler);

export { router as TransferRoutes };