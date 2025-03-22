import { Request, Response } from 'express';
import catchErrors from '../utils/catchErrors';
import {
  createThanksgiving,
  getAllThanksgiving,
} from './thanksgiving.service';


export const createThanksgivingHandler = catchErrors(async (req: Request, res: Response) => {
  const { memberName, message } = req.body;

  const thanksgiving = await createThanksgiving(memberName, message);
  res.status(201).send(thanksgiving);
});


export const getThanksgivingsHandler = catchErrors(async (req: Request, res: Response) => {
  const thanksgivings = await getAllThanksgiving();
  res.status(200).send(thanksgivings);
});