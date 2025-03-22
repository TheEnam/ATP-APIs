// src/routes/announcements.ts
import express from 'express';
import {   createAnnouncementHandler,
    getAnnouncementsHandler,} from './announcement.controller';

const router = express.Router();

router.post('/', createAnnouncementHandler);
router.get('/', getAnnouncementsHandler);

export {router as announcementRoutes};;