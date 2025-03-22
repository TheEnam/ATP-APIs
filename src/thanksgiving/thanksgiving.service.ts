import Thanksgiving from './thanksgiving.model';

// Create a new thanksgiving message
export const createThanksgiving = async (memberName: string, message: string) => {
  if (!memberName || !message) {
    throw new Error('Member name and message are required.');
  }

  const thanksgiving = new Thanksgiving({ memberName, message });
  await thanksgiving.save();
  return thanksgiving;
};

// Fetch all thanksgiving messages
export const getAllThanksgiving = async () => {
  const thanksgivings = await Thanksgiving.find().sort({ createdAt: -1 });
  return thanksgivings;
};