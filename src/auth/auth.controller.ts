import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { AuthSchema } from "./auth.schema";
import { Request, Response } from "express";
import { createAccount, login } from "./auth.service";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { AccessTokenPayload, verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";

export default class AuthController {
  static registerHandler = catchErrors(async function (
    req: Request<{}, {}, z.infer<typeof AuthSchema.register>>,
    res: Response
  ) {
    // Validate the request body
    const { email, password, confirmPassword, userAgent } =
      AuthSchema.validateRegister(req.body);

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Create the user account
    const { user, accessToken, refreshToken } = await createAccount({
      email,
      password,
      userAgent,
    });

    // Set authentication cookies
    setAuthCookies({ res, accessToken, refreshToken });

    return res.status(CREATED).json({
      id: user.id,
      email: user.email,
      verified: user.verified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });

  static loginHandler = catchErrors(async function (
    req: Request<{}, {}, z.infer<typeof AuthSchema.login>>,
    res: Response
  ) {
    // Validate the request body
    const {body} = req;
    const { email, password } = AuthSchema.validateLogin(body);

    // Login the user
    const { user, accessToken, refreshToken } = await login({
      email,
      password,
      
    });

    // Set authentication cookies
    setAuthCookies({ res, accessToken, refreshToken });

    return res.status(OK).json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
    });
  });

  // static logoutHandler = catchErrors(async (req, res)=> {
  //   const accessToken = req.cookies.accessToken;
  //   const {payload} = verifyToken<AccessTokenPayload>(accessToken);


  //   if(payload){
  //     await SessionModel.findByIdAndDelete(payload.sessionId);

  //   }

  //   // Clear the authentication cookies
  //   res.clearCookie("accessToken");
  //   res.clearCookie("refreshToken");

  //   return res.status(OK).json({ message: "Logout successful" });
  // });
}


