import { Request, Response } from 'express';
import { CREATED, OK } from '../constants/http';
import catchErrors from '../utils/catchErrors';
import { 
  createAnnouncement, 
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement 
} from './announcement.service';

export const createAnnouncementHandler = catchErrors(async (req: Request, res: Response) => {
  const announcement = await createAnnouncement(req.body);
  res.status(CREATED).json(announcement);
});

export const getAnnouncementsHandler = catchErrors(async (req: Request, res: Response) => {
  const announcements = await getAllAnnouncements(req.query);
  res.status(OK).json(announcements);
});

export const getAnnouncementByIdHandler = catchErrors(async (req: Request, res: Response) => {
  const announcement = await getAnnouncementById(req.params.id);
  res.status(OK).json(announcement);
});

export const updateAnnouncementHandler = catchErrors(async (req: Request, res: Response) => {
  const announcement = await updateAnnouncement(req.params.id, req.body);
  res.status(OK).json(announcement);
});

export const deleteAnnouncementHandler = catchErrors(async (req: Request, res: Response) => {
  const announcement = await deleteAnnouncement(req.params.id);
  res.status(OK).json(announcement);
});