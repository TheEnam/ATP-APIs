import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { AuthSchema, emailSchema } from "./auth.schema";
import { Request, Response } from "express";
import { createAccount, login, refreshUserAccessToken, resetPassword, sendPasswordResetEmail, verifyEmail } from "./auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../utils/cookies";
import { AccessTokenPayload, verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";
import appAsert from "../utils/appAssert";

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
    const { user } = await createAccount({
      email,
      password,
      userAgent,
    });

    // Set authentication cookies
    //setAuthCookies({ res, accessToken, refreshToken });

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
     accessToken,
    refreshToken,
    });

  });

  static logoutHandler = catchErrors(async (req, res)=> {
    const accessToken = req.cookies.accessToken as string | undefined;
    const {payload} = verifyToken(accessToken || "", );


    if(payload){
      await SessionModel.findByIdAndDelete(payload.sessionId);

    }

    // Clear the authentication cookies
    clearAuthCookies(res);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(OK).json({ message: "Logout successful" });
  });

  static refreshHandler = catchErrors(async (req, res) => {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    appAsert(refreshToken,UNAUTHORIZED,"Missing refresh token");


   const {accessToken, newRefreshToken} = await refreshUserAccessToken(refreshToken);

   if (refreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
   }

    return res.status(OK)
    .cookie("accessToken",accessToken,getAccessTokenCookieOptions())
    .json({message:"Token refreshed", accessToken});
  });

  static sendPasswordResetHandler = catchErrors(async (req, res) => {
    const email = emailSchema.parse(req.body.email);

    await sendPasswordResetEmail(email);
    // Send password reset email
    return res.status(OK).json({ message: "Password reset email sent" });
  })


  static resetPasswordHandler = catchErrors(async (req, res) => {
    const request = AuthSchema.resetPassword.parse(req.body);

    await resetPassword(request);

    return clearAuthCookies(res).status(OK).json({mesage:"Password reset succesful"})
  })
}

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const result = await verifyEmail(req.body)

  return res.status(OK).json(result);
});


