import { CREATED } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { Request, Response } from "express";
import { createTransfer } from "./transfer.service";

export const createTransferHandler = catchErrors (async(req:Request, res:Response) => {
    const transfer = await createTransfer(req.body);
    res.status(CREATED).json(transfer);

});