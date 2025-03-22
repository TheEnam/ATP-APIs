import Announcement from './announcement.model';

// Create a new announcement
export const createAnnouncement = async (title: string, description: string) => {
  if (!title || !description) {
    throw new Error('Title and description are required.');
  }

  const announcement = new Announcement({ title, description });
  await announcement.save();
  return announcement;
};

// Fetch all announcements
export const getAllAnnouncements = async () => {
  const announcements = await Announcement.find().sort({ createdAt: -1 });
  return announcements;
};