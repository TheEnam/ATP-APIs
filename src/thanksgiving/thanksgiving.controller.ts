import { Request, Response } from 'express';
import catchErrors from '../utils/catchErrors';
import {
  createThanksgiving,
  deleteThanksgiving,
  getAllThanksgivings,
  getThanksgivingById,
  updateThanksgiving,
} from './thanksgiving.service';
import { CREATED, OK } from '../constants/http';


export const createThanksgivingHandler = catchErrors(async (req: Request, res: Response) => {
  const thanksgiving = await createThanksgiving(req.body);
  res.status(CREATED).json(thanksgiving);
});


export const getThanksgivingsHandler = catchErrors(async (req: Request, res: Response) => {
  const thanksgivings = await getAllThanksgivings(req.query);
  res.status(200).send(thanksgivings);
});

export const getThanksgivingByIdHandler = catchErrors(async (req: Request, res: Response) => {
  const thanksgiving = await getThanksgivingById(req.params.id);
  res.status(OK).json(thanksgiving);
});

export const updateThanksgivingHandler = catchErrors(async (req: Request, res: Response) => {
  const thanksgiving = await updateThanksgiving(req.params.id, req.body);
  res.status(OK).json(thanksgiving);
});

export const deleteThanksgivingHandler = catchErrors(async (req: Request, res: Response) => {
  const thanksgiving = await deleteThanksgiving(req.params.id);
  res.status(OK).json(thanksgiving);
});