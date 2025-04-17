
import express from "express"
import AuthController, { verifyEmailHandler } from "../auth.controller";


const router = express.Router();

//prefix:/auth
router.post("/register", AuthController.registerHandler);
router.post("/login", AuthController.loginHandler);
router.get("/logout", AuthController.logoutHandler);
router.get("/refresh", AuthController.refreshHandler);
router.post("/email/verify", verifyEmailHandler);
router.post("/password/forgot", AuthController.sendPasswordResetHandler);
router.post("/password/reset", AuthController.resetPasswordHandler);


export {router as AuthRoutes};

