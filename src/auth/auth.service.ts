import { TokenExpiredError } from "jsonwebtoken";
import { CreateAccountParams, LoginParams } from "./auth.entities";
import UserModel from "../users/user.model";
import VerificationCodeModel from "../users/verificationCode.model";
import VerificationCodeType from "../constants/verificationCodeTypes";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow, fiveMinutesAgo,oneHourFromNow } from "../utils/date";
import SessionModel from "../models/session.model";
import { APP_ORIGIN, JWT_REFRESH_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";
import CustomError from "../constants/custom_error";
import appAsert from "../utils/appAssert";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from "../constants/http";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  verifyToken,
  // verifyToken,
} from "../utils/jwt";
import { ref } from "joi";
import { sendMail } from "../utils/sendMail";
import { getPasswordResetTemplate, getVerifyEmailTemplate } from "../utils/emailTemplates";
import { hashValue } from "../utils/bcrypt";

export const createAccount = async (data: CreateAccountParams) => {
  //verify user
  const existingUser = await UserModel.exists({
    email: data.email,
  });
  appAsert(!existingUser, CONFLICT, "Email already in use");


  //create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  //create verification code
  const verificationCode = await VerificationCodeModel.create({
    code: Math.floor(1000 + Math.random() * 9000).toString(),
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN}/email/verify`;
  const code = verificationCode.code;
  //send verification email
  const {
    error
  } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url,code),
  });
  if(error){
    console.log(error);
  }
  // create session
  // const session = await SessionModel.create({
  //   userId,
  //   userAgent: data.userAgent,
  // });

  // // sign access token & refresh Token
  // const refreshToken = signToken(
  //   { sessionId: session._id },
  //   refreshTokenSignOptions
  // );

  // const accessToken = signToken({
  //   userId,
  //   sessionId: session._id,
  // });

  //return user & tokens
  return {
    user,
    // accessToken,
    // refreshToken,
  };
};

export const login = async ({ email, password }: LoginParams) => {
  
  //get user by email
  const user = await UserModel.findOne({
    email,
  });
  appAsert(user, UNAUTHORIZED, "Invalid email or password");

   // Check if email is verified
   appAsert(user.verified, UNAUTHORIZED, "Please verify your email before logging in");
   
  //validate password from the request
  const isValid = await user.comparePassword(password);
  console.log(isValid);
  appAsert(isValid, UNAUTHORIZED, "Invalid email or password");
  const userId = user._id;

  //create a session
  const session = await SessionModel.create({
    userId,
  });

  const sessionInfo = {
    sessionId: session._id,
  };

  //sign access token & refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);

  const accessToken = signToken({
    ...sessionInfo,
    userId,
  });

  //return user & tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenSignOptions.secret,
  });
  appAsert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAsert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  //refresh the session if it expires in the next 24 hours
  const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }


  const newRefreshToken = sessionNeedsRefresh ? signToken({
    sessionId: session._id
  }, refreshTokenSignOptions) : undefined;
  

  const accessToken = signToken({
    userId: session.userId,
    sessionId: session._id,
  });
  return{
    accessToken,
    newRefreshToken
  }


};

export const verifyEmail = async (verificationData: { code: string }) => {
  //get the verification code
  const validCode = await VerificationCodeModel.findOne({
    code: verificationData.code,
    type: VerificationCodeType.EmailVerification,
    expiresAt: { $gt: new Date() },
  });
  appAsert(validCode, NOT_FOUND, "Invalid or expired verification code");
  //update userto verified true
  const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId,
     {
    verified: true,},
  {new: true}).select('-password');
  appAsert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");
  //delete verification code
  await validCode.deleteOne();

  //return user
  return{
    updatedUser
  }
}

export const sendPasswordResetEmail = async (email: string) => {
  //get user by email
  const user = await UserModel.findOne({email});
  appAsert(user,NOT_FOUND,"User not found");
  
  //check email rate limit
  const fiveMinsAgo = fiveMinutesAgo();
  const count = await VerificationCodeModel.countDocuments({ 
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    createdAt: { $gt: fiveMinsAgo },
  })
  appAsert(count <= 1,TOO_MANY_REQUESTS,"Too many requests, try again later");

  //create verification code
  const expiresAt = oneHourFromNow();
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.PasswordReset,
    expiresAt,
  });

  //send email
  const url = `${APP_ORIGIN}/password/reset/?code=${verificationCode._id}&exp= ${expiresAt.getTime()}`;
  const response = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });

  if (response.error) {
    console.error('Email sending failed:', response.error);
    appAsert(false, INTERNAL_SERVER_ERROR, `Failed to send email: ${response.error.message}`);
  }

  return {
    url,
    emailId: response.data?.id
  };
}

type ResetPasswordParams = {
  password: string;
  verificationCode: string;
};
export const resetPassword = async(
  {
    password, verificationCode,
  }: ResetPasswordParams) =>{
    //get verification code
    const validCode = await VerificationCodeModel.findOne({
      _id: verificationCode,
      type: VerificationCodeType.PasswordReset,
      expiresAt: {$gt: new Date()},

    })
    appAsert(validCode,NOT_FOUND,"Invalid or expired verification code");

    //update users password
    const updatedUser = await UserModel.findByIdAndUpdate(validCode.userId,{
      password: await hashValue(password),
    })
    appAsert(updatedUser,INTERNAL_SERVER_ERROR,"Failed to update password");
    //delete verification code
    await validCode.deleteOne();
    //delete all sessions
    await SessionModel.deleteMany({
      userId: updatedUser._id,   
    });

    return{
      user: updatedUser
    }
  }


