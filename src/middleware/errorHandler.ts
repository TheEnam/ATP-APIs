import { ErrorRequestHandler } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { Request, Response,NextFunction } from "express"; 

import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies, REFRESH_PATH } from "../utils/cookies";
import { Error as MongooseError } from "mongoose";

const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
  
    res.status(BAD_REQUEST).json({
      errors,
      message: error.message,
    });
};
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({message: error.message,
    errorCode: error.errorCode});
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);

    if (req.path === REFRESH_PATH) {
        clearAuthCookies(res);
    }
    if (error instanceof z.ZodError) {
        handleZodError(res, error);
        return;
    }

    if (error instanceof AppError) {
        handleAppError(res, error);
        return;
    }

    if (error instanceof MongooseError.ValidationError) {
        const errors = Object.values(error.errors).map(error => ({
            field: error.path,
            message: error.message
        }));

        res.status(BAD_REQUEST).json({
            status: 'error',
            message: 'Validation Error',
            errors
        });
        return;
    }

    res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
    return;
};

export default errorHandler;