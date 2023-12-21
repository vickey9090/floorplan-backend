import { Router } from "express";
// import {test,SignUp,GetUser,createProfile} from "../controller/authController.js"
import { signup,verifyOtp,login,forgotPassword,verifyForgotPassword } from "../controller/authController.js";
export let authRouter = Router()
authRouter.route('/signup').post([signup]);
authRouter.route('/verifyOtp').post([verifyOtp]);
authRouter.route('/login').post([login]);
authRouter.route('/forgotPassword').post([forgotPassword]);
authRouter.route('/verifyForgotPassword').post([verifyForgotPassword]);




