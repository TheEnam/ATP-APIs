import { RequestHandler } from "express"
import appAsert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import AppError from "../utils/AppError";
import AppErrorCoode from "../constants/appErrorCode";
import { verifyToken } from "../utils/jwt";
import mongoose, { ObjectId } from "mongoose";



const authenticate: RequestHandler = (req,res,next)=>{
    const accessToken = req.cookies.accessToken as string | undefined ;
    appAsert(accessToken,UNAUTHORIZED,"Not authorized", AppErrorCoode.InvalidAccessToken)

    const {error,payload} = verifyToken(accessToken);
    appAsert(payload,UNAUTHORIZED,error === 'jwt expired'? "Token expired": "Invalid token", AppErrorCoode.InvalidAccessToken)


    const userId = new mongoose.Types.ObjectId()
    const sessionId = new mongoose.Types.ObjectId()
    const typedPayload = payload as {  userId : typeof userId, sessionId: typeof sessionId};
    req.userId = typedPayload.userId;
    req.sessionId = typedPayload.sessionId;
    next();
}

export default authenticate;