import { CREATED, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import { Request, Response } from "express";
import { advanceTransferStage, createTransfer, deleteTransfer, getAllTransfers, getTransferById, rejectTransfer, updateTransfer } from "./transfer.service";

export const createTransferHandler = catchErrors (async(req:Request, res:Response) => {
    const transfer = await createTransfer(req.body);
    res.status(CREATED).json(transfer);

});

export const getTransfersHandler = catchErrors(async (req: Request, res: Response) => {
    const transfers = await getAllTransfers(req.query);
    res.status(200).send(transfers);
  });
  
  export const getTransferByIdHandler = catchErrors(async (req: Request, res: Response) => {
    const transfer = await getTransferById(req.params.id);
    res.status(OK).json(transfer);
  });
  
  export const updateTransferHandler = catchErrors(async (req: Request, res: Response) => {
    const transfer = await updateTransfer(req.params.id, req.body);
    res.status(OK).json(transfer);
  });
  
  export const deleteTransferHandler = catchErrors(async (req: Request, res: Response) => {
    const transfer = await deleteTransfer(req.params.id);
    res.status(OK).json(transfer);
  });
  
export const advanceStageHandler = catchErrors(async (req: Request, res: Response) => {
    const transfer = await advanceTransferStage(req.params.id);
    res.status(200).json(transfer);
  });
  
  export const rejectTransferHandler = catchErrors(async (req: Request, res: Response) => {
    const transfer = await rejectTransfer(req.params.id);
    res.status(200).json(transfer);
  });