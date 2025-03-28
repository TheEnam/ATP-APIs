import { FilterQuery } from 'mongoose';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http';
import appAsert from '../utils/appAssert';
import ThanksgivingModel, { IThanksgiving } from './thanksgiving.model';
import Thanksgiving from './thanksgiving.model';

export const createThanksgiving = async (data: Partial<IThanksgiving>): Promise<IThanksgiving> => {
  const thanksgiving = await ThanksgivingModel.create(data);
  
  appAsert(
    thanksgiving, 
    INTERNAL_SERVER_ERROR, 
    'Failed to create Thanksgiving'
  );

  return thanksgiving;
};

export const getAllThanksgivings = async (
  filter: Partial<IThanksgiving> = {}
) => {
  const thanksgivings = await ThanksgivingModel.find(filter as FilterQuery<IThanksgiving>)
    .sort({ dateOfThanksgiving: -1 })
    .lean();

  return thanksgivings;
};


export const getThanksgivingById = async (id: string) => {
  const thanksgiving = await ThanksgivingModel.findById(id).lean();
  
  appAsert(
    thanksgiving, 
    NOT_FOUND, 
    'Thanksgiving not found'
  );

  return thanksgiving;
};

export const updateThanksgiving = async (
  id: string, 
  updates: Partial<IThanksgiving>
) => {
  const thanksgiving = await ThanksgivingModel.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  ).lean();

  appAsert(
    thanksgiving, 
    NOT_FOUND, 
    'Thanksgiving not found'
  );

  return thanksgiving;
};

export const deleteThanksgiving = async (id: string) => {
  const thanksgiving = await ThanksgivingModel.findByIdAndDelete(id).lean();
  
  appAsert(
    thanksgiving, 
    NOT_FOUND, 
    'Thanksgiving not found'
  );

  return thanksgiving;
};