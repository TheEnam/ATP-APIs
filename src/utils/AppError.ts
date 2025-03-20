import { number } from "joi";
import { HttpStatusCode } from "../constants/http";
import AppErrorCoode from "../constants/appErrorCode";

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    public message: string,
    public errorCode?: AppErrorCoode
  ) {
    super(message);
  }
}


export default AppError;
