import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
// import {test,SignUp,GetUser,createProfile} from "../controller/authController.js"
import { signup,verifyOtp,login,forgotPassword,verifyForgotPassword,changePassword ,CreateProfile} from "../controller/authController.js";
export let authRouter = Router()
authRouter.route('/signup').post([signup]);
authRouter.route('/verifyOtp').post([verifyOtp]);
authRouter.route('/login').post([login]);
authRouter.route('/forgotPassword').post([forgotPassword]);
authRouter.route('/verifyForgotPassword').post([verifyForgotPassword]);
authRouter.route('/changePassword').post([checkAuth,changePassword]);
authRouter.route('/CreateProfile').post([checkAuth,CreateProfile]);






