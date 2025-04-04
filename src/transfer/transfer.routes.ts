import express from 'express';
import { advanceStageHandler, createTransferHandler, deleteTransferHandler, getTransferByIdHandler, getTransfersHandler, rejectTransferHandler, updateTransferHandler } from './transfer.controller';

const router = express.Router();

router.post("/", createTransferHandler);
router.get('/', getTransfersHandler);
router.get('/:id', getTransferByIdHandler);
router.put('/:id', updateTransferHandler);
router.delete('/:id', deleteTransferHandler);

router.post('/:id/advance',  advanceStageHandler);
router.post('/:id/reject',  rejectTransferHandler);

export { router as TransferRoutes };