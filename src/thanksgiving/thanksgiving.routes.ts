// src/routes/thanksgiving.ts
import express from 'express';
import { createThanksgivingHandler, deleteThanksgivingHandler, getThanksgivingByIdHandler, getThanksgivingsHandler, updateThanksgivingHandler } from './thanksgiving.controller';

const router = express.Router();

router.post('/', createThanksgivingHandler);
router.get('/', getThanksgivingsHandler);
router.get('/:id', getThanksgivingByIdHandler);
router.put('/:id', updateThanksgivingHandler);
router.delete('/:id', deleteThanksgivingHandler);

export {router as thanksGivingRoutes};