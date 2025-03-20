
import express from "express"
import AuthController from "../auth.controller";


const router = express.Router();

//prefix:/auth
router.post("/register", AuthController.registerHandler);
router.post("/login", AuthController.loginHandler);
//router.post("/logout", AuthController.logoutHandler);

export {router as AuthRoutes};