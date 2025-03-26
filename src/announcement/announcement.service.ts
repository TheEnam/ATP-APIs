import { FilterQuery } from 'mongoose';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http';
import appAsert from '../utils/appAssert';
import AnnouncementModel, { IAnnouncement } from './announcement.model';


export const createAnnouncement = async (data: Partial<IAnnouncement>): Promise<IAnnouncement> => {
  const announcement = await AnnouncementModel.create(data);
  
  appAsert(
    announcement, 
    INTERNAL_SERVER_ERROR, 
    'Failed to create announcement'
  );

  return announcement;
};

export const getAllAnnouncements = async (
  filter: Partial<IAnnouncement> = {}
) => {
  const announcements = await AnnouncementModel.find(filter as FilterQuery<IAnnouncement>)
    .sort({ dateOfAnnouncement: -1 })
    .lean();

  return announcements;
};

export const getAnnouncementById = async (id: string) => {
  const announcement = await AnnouncementModel.findById(id).lean();
  
  appAsert(
    announcement, 
    NOT_FOUND, 
    'Announcement not found'
  );

  return announcement;
};

export const updateAnnouncement = async (
  id: string, 
  updates: Partial<IAnnouncement>
) => {
  const announcement = await AnnouncementModel.findByIdAndUpdate(
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
  const announcement = await AnnouncementModel.findByIdAndDelete(id).lean();
  
  appAsert(
    announcement, 
    NOT_FOUND, 
    'Announcement not found'
  );

  return announcement;
};