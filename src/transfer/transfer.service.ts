import { FilterQuery, Types } from "mongoose";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http";
import appAssert from "../utils/appAssert";
import TransferModel, { ITransfer, TransferStage, TransferType } from "./transfer.model";

export const createTransfer = async (data: Omit<ITransfer, 'createdAt' | 'updatedAt'>) => {
    try {
        const transfer = await TransferModel.create({
            ...data,
            dateOfBirth: new Date(data.dateOfBirth),
            dateOfBaptism: new Date(data.dateOfBaptism)
        });
        return transfer.toObject();
    } catch (error) {
        appAssert(
            false,
            INTERNAL_SERVER_ERROR,
            'Failed to create transfer'
        );
    }
};

export const getAllTransfers = async (
    filter: {
        memberName?: string;
        churchFrom?: string;
        churchTo?: string;
        transferType?: TransferType;
        transferStage?: TransferStage;
    } = {},
    sort: Record<string, 1 | -1> = { createdAt: -1 }
) => {
    const query: FilterQuery<ITransfer> = {};
    
    // Build the query dynamically
    if (filter.memberName) query.memberName = { $regex: filter.memberName, $options: 'i' };
    if (filter.churchFrom) query.churchFrom = filter.churchFrom;
    if (filter.churchTo) query.churchTo = filter.churchTo;
    if (filter.transferType) query.transferType = filter.transferType;
    if (filter.transferStage) query.transferStage = filter.transferStage;

    const transfers = await TransferModel.find(query)
        .sort(sort)
        .lean();

    return transfers;
};

export const getTransferById = async (id: string | Types.ObjectId) => {
    const transfer = await TransferModel.findById(id).lean();
    
    appAssert(
        transfer, 
        NOT_FOUND, 
        'Transfer not found'
    );

    return transfer;
};

export const updateTransfer = async (
    id: string | Types.ObjectId, 
    updates: Partial<ITransfer>
) => {
    
    const { _id, createdAt, updatedAt, ...safeUpdates } = updates;
    
    const transfer = await TransferModel.findByIdAndUpdate(
        id,
        { $set: safeUpdates },
        { new: true, runValidators: true }
    ).lean();

    appAssert(
        transfer, 
        NOT_FOUND, 
        'Transfer not found'
    );

    return transfer;
};

export const deleteTransfer = async (id: string | Types.ObjectId) => {
    const transfer = await TransferModel.findByIdAndDelete(id).lean();
    
    appAssert(
        transfer, 
        NOT_FOUND, 
        'Transfer not found'
    );

    return transfer;
};

export const advanceTransferStage = async (id: string | Types.ObjectId) => {
    const transfer = await TransferModel.findById(id).lean();
    
    appAssert(
        transfer, 
        NOT_FOUND, 
        'Transfer not found'
    );

    const currentStage = transfer.transferStage;
    let nextStage: TransferStage;

    switch (currentStage) {
        case TransferStage.FIRST_READING:
            nextStage = TransferStage.SECOND_READING;
            break;
        case TransferStage.SECOND_READING:
            nextStage = TransferStage.THIRD_READING;
            break;
        case TransferStage.THIRD_READING:
            nextStage = TransferStage.APPROVED;
            break;
        default:
            nextStage = currentStage;
    }

    const updated = await TransferModel.findByIdAndUpdate(
        id,
        { $set: { transferStage: nextStage } },
        { new: true }
    ).lean();

    return updated;
};

export const rejectTransfer = async (id: string | Types.ObjectId) => {
    const updated = await TransferModel.findByIdAndUpdate(
        id,
        { $set: { transferStage: TransferStage.REJECTED } },
        { new: true }
    ).lean();

    appAssert(
        updated, 
        NOT_FOUND, 
        'Transfer not found'
    );

    return updated;
};