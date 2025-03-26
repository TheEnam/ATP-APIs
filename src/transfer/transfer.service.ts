import { INTERNAL_SERVER_ERROR } from "../constants/http";
import appAssert from "../utils/appAssert";
import TransferModel, { ITransfer } from "./transfer.model";

export const createTransfer = async(data: Partial<ITransfer>) => {
    const transfer = await TransferModel.create(data);
    appAssert(
        transfer,
        INTERNAL_SERVER_ERROR,
        'Failed to create transfer'
    );
    return transfer;
}