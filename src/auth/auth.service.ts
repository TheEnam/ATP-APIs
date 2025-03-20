import { TokenExpiredError } from "jsonwebtoken";
import { CreateAccountParams, LoginParams } from "./auth.entities";
import UserModel from "../users/user.model";
import VerificationCodeModel from "../users/verificationCode.model";
import VerificationCodeType from "../constants/verificationCodeTypes";
import { oneYearFromNow } from "../utils/date";
import SessionModel from "../models/session.model";
import { JWT_REFRESH_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";
import CustomError from "../constants/custom_error";
import appAsert from "../utils/appAssert";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import {
  RefreshTokenPayload,
  refreshTokenSignOptions,
  signToken,
  // verifyToken,
} from "../utils/jwt";


export const createAccount = async (data: CreateAccountParams) => {
  //verify user
  const existingUser = await UserModel.exists({
    email: data.email,
  });
  appAsert(!existingUser, CONFLICT, "Email already in use");
  // if (existingUser) {
  //   throw new CustomError(409,"User already exists");
  // }

  //create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  //create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  //send verification email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  // sign access token & refresh Token
  const refreshToken = signToken(
    { sessionId: session._id },
    refreshTokenSignOptions,

  );

  const accessToken = signToken(
    {
      userId,
      sessionId: session._id,
    },
  );

  //return user & tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const login = async ({ email, password }: LoginParams) => {
  //get user by email
  const user = await UserModel.findOne({
    email,
  });
  appAsert(user, UNAUTHORIZED, "Invalid email or password");

  //validate password from the request
  const isValid = user.comparePassword(password);
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

  
    const accessToken = signToken(
      {
        ...sessionInfo,
        userId,
    
      },
    );
    
  //return user & tokens
  return {
    user,
    accessToken,
    refreshToken,
  };
};
