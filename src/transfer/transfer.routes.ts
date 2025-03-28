import express from 'express';
import { createTransferHandler, deleteTransferHandler, getTransferByIdHandler, getTransfersHandler, updateTransferHandler } from './transfer.controller';

const router = express.Router();

router.post("/", createTransferHandler);
router.get('/', getTransfersHandler);
router.get('/:id', getTransferByIdHandler);
router.put('/:id', updateTransferHandler);
router.delete('/:id', deleteTransferHandler);

export { router as TransferRoutes };