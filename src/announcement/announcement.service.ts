import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http';
import appAsert from '../utils/appAssert';
import Announcement, { AnnouncementType } from './announcement.model';

interface CreateAnnouncementParams {
  title: string;
  description: string;
  typeOfAnnouncement: AnnouncementType;
  dateOfAnnouncement: Date;
  is_recurring: boolean;
}

export const createAnnouncement = async (params: CreateAnnouncementParams) => {
  const announcement = await Announcement.create(params);
  
  appAsert(
    announcement, 
    INTERNAL_SERVER_ERROR, 
    'Failed to create announcement'
  );

  return announcement;
};

export const getAllAnnouncements = async (
  filter: Partial<CreateAnnouncementParams> = {}
) => {
  const announcements = await Announcement.find(filter)
    .sort({ dateOfAnnouncement: -1 })
    .lean();

  return announcements;
};

export const getAnnouncementById = async (id: string) => {
  const announcement = await Announcement.findById(id).lean();
  
  appAsert(
    announcement, 
    NOT_FOUND, 
    'Announcement not found'
  );

  return announcement;
};

export const updateAnnouncement = async (
  id: string, 
  updates: Partial<CreateAnnouncementParams>
) => {
  const announcement = await Announcement.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  ).lean();

  appAsert(
    announcement, 
    NOT_FOUND, 
    'Announcement not found'
  );

  return announcement;
};

export const deleteAnnouncement = async (id: string) => {
  const announcement = await Announcement.findByIdAndDelete(id).lean();
  
  appAsert(
    announcement, 
    NOT_FOUND, 
    'Announcement not found'
  );

  return announcement;
};