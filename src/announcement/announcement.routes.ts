import express from 'express';
import {
  createAnnouncementHandler,
  getAnnouncementsHandler,
  getAnnouncementByIdHandler,
  updateAnnouncementHandler,
  deleteAnnouncementHandler
} from './announcement.controller';

const router = express.Router();

router.post('/', createAnnouncementHandler);
router.get('/', getAnnouncementsHandler);
router.get('/:id', getAnnouncementByIdHandler);
router.put('/:id', updateAnnouncementHandler);
router.delete('/:id', deleteAnnouncementHandler);

export { router as AnnouncementRoutes };