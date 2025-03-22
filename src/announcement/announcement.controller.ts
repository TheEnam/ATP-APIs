import { Request, Response } from 'express';
import catchErrors from '../utils/catchErrors';
import { createAnnouncement, getAllAnnouncements } from './announcement.service';

// Create a new announcement
export const createAnnouncementHandler = catchErrors(async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const announcement = await createAnnouncement(title, description);
  res.status(201).send(announcement);
});

// Fetch all announcements
export const getAnnouncementsHandler = catchErrors(async (req: Request, res: Response) => {
  const announcements = await getAllAnnouncements();
  res.status(200).send(announcements);
});