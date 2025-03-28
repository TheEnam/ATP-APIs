import { FilterQuery } from "mongoose";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";
import TransferModel, { ITransfer } from "./transfer.model";
import appAsert from "../utils/appAssert";

export const createTransfer = async(data: Partial<ITransfer>) => {
    const transfer = await TransferModel.create(data);
    appAssert(
        transfer,
        INTERNAL_SERVER_ERROR,
        'Failed to create transfer'
    );
    return transfer;
}

export const getAllTransfers = async (
  filter: Partial<ITransfer> = {}
) => {
  const transfers = await TransferModel.find(filter as FilterQuery<ITransfer>)
    .sort({ dateOfTransfer: -1 })
    .lean();

  return transfers;
};


export const getTransferById = async (id: string) => {
  const transfer = await TransferModel.findById(id).lean();
  
  appAsert(
    transfer, 
    NOT_FOUND, 
    'Transfer not found'
  );

  return transfer;
};

export const updateTransfer = async (
  id: string, 
  updates: Partial<ITransfer>
) => {
  const transfer = await TransferModel.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  ).lean();

  appAsert(
    transfer, 
    NOT_FOUND, 
    'Transfer not found'
  );

  return transfer;
};

export const deleteTransfer = async (id: string) => {
  const transfer = await TransferModel.findByIdAndDelete(id).lean();
  
  appAsert(
    transfer, 
    NOT_FOUND, 
    'Transfer not found'
  );

  return transfer;
};