// src/routes/thanksgiving.ts
import express from 'express';
import { createThanksgivingHandler, getThanksgivingsHandler } from './thanksgiving.controller';

const router = express.Router();

router.post('/', createThanksgivingHandler);
router.get('/', getThanksgivingsHandler);

export {router as thanksGivingRoutes};