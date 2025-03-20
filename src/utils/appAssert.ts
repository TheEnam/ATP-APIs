import assert from "node:assert";
import AppError from "./AppError";
import { HttpStatusCode } from "../constants/http";
import AppErrorCoode from "../constants/appErrorCode";

type AppAssert = (
    condition: any,
    HttpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: AppErrorCoode
) => asserts condition;

const appAsert:AppAssert = (
    condition,
    HttpStatusCode,
    message,
    appErrorCode
) => {
    assert(condition, new AppError(HttpStatusCode,message,appErrorCode));
}

export default appAsert;