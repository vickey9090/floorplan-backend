import CustomSuccess from "../utils/Response/CustomSuccess.js";
import CustomError from "../utils/Response/CustomError.js";
// import bcrypt from "bcrypt";
import { user } from "../model/userModel.js";
import { OtpTable } from "../model/otpModel.js";
import { mediaModel } from "../model/mediaModel.js";
import { signUpValidator, OtpValidator, loginValidator, profileValidator } from "../utils/validators/userValidator.js";
import { generateToken } from "../utils/generateToken.js";



export const signup = async (req, res, next) => {
    try {
        await signUpValidator.validateAsync(req.body);

        const { name, email, password, userType } = req.body;
        const checkEmail = await user.findOne({ email });
        if (checkEmail) {
            return next(CustomError.createError("User already exists", 400));
        }
        const hashpass = bcrypt.hashSync(
            password,
            "$2b$12$OSHUicJPx99s9FVWucVZKu"
        );
        const otpCode = Math.floor(1000 + Math.random() * 9000);

        const userModel = await user.create({ firstName: name, email: email, password: hashpass, userType: userType });
        await OtpTable.create({ userid: userModel._id, otpKey: otpCode });
        return next(CustomSuccess.createSuccess({ userModel, OtpKey: otpCode }, "User Signed Up Successfully", 200));

    } catch (err) {
        return next(CustomError.createError(err.message, 500));

    }
}

export const verifyOtp = async (req, res, next) => {
    try {
        await OtpValidator.validateAsync(req.body);


        const { userid, otpCode } = req.body;
        const otp = await OtpTable.findOne({ userid });
        if (otp.otpKey != otpCode) {
            return next(CustomError.createError("Incorrect OTP", 400));
        }
        if (Date.now() > otp.expiry) {
            return next(CustomError.createError("OTP EXPIRED", 400));

        }
        const userModel = await user.findOneAndUpdate({ _id: userid }, { isVerified: true });
        if (userModel.isVerified) {
            return next(CustomError.createError("User Already verified", 400));
        }
        return next(CustomSuccess.createSuccess({ otp }, "Otp Verified Sucessfully", 200));
    } catch (err) {
        return next(CustomError.createError(err.message, 500));

    }
}

export const login = async (req, res, next) => {
    try {
        await loginValidator.validateAsync(req.body);

        const { email, password } = req.body;
        const userLogin = await user.findOne({ email });

        if (!userLogin) {

            return next(CustomError.createError("User Not Found", 404));

        };
        const hashpass = bcrypt.compareSync(
            password,
            userLogin.password
        );
        if (!hashpass) {
            return next(CustomError.createError("Incorrect password", 400));

        };
        if (!userLogin.isVerified) {
            return next(CustomError.createError("User Not verified", 400));

        };

        const token = generateToken({ id: userLogin._id, email: userLogin.email });
        delete userLogin._doc.password;
        delete userLogin._doc.__v;
        delete userLogin._doc.devices;
        return next(CustomSuccess.createSuccess({ userLogin, token }, "User logged in Sucessfully", 200));


    } catch (err) {
        return next(CustomError.createError(err.message, 400));

    }
}


export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const forgotPass = await user.findOne({ email });
        if (!forgotPass) {
            return next(CustomError.createError("User Not Found", 400));

        }
        const otpCode = Math.floor(1000 + Math.random() * 9000);
        const updateOtp = await OtpTable.findOneAndUpdate({ userid: forgotPass._id }, { otpKey: otpCode, expiry: new Date(Date.now() + 10 * 60 * 1000), });
        return next(CustomSuccess.createSuccess({ updateOtp, otpCode }, "OTP sent on registered email", 200));


    } catch (error) {
        return next(CustomError.createError(error.message, 400));

    }
}

export const verifyForgotPassword = async (req, res, next) => {
    try {



        const { userid, otpCode } = req.body;
        const otp = await OtpTable.findOne({ userid });
        if (otp.otpKey != otpCode) {
            return next(CustomError.createError("Incorrect OTP", 400));
        }
        if (Date.now() > otp.expiry) {
            return next(CustomError.createError("OTP EXPIRED", 400));

        }

        return next(CustomSuccess.createSuccess({ otp }, "Otp Verified Sucessfully", 200));
    } catch (err) {
        return next(CustomError.createError(err.message, 500));

    }
}
export const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const userModel = await user.findOne({ _id: req.userId });
        const unHash = bcrypt.compareSync(
            oldPassword,
            userModel.password
        );

        if (!unHash) {
            return next(CustomError.createError("Incorrect Old Password", 400));

        }
        const hashpass = bcrypt.hashSync(
            newPassword,
            "$2b$12$OSHUicJPx99s9FVWucVZKu"
        );
        const updateDetails = await user.findOneAndUpdate({ _id: req.userId }, { password: hashpass });
        return next(CustomSuccess.createSuccess({ updateDetails }, "Password Changed Sucessfully", 200));


    } catch (error) {
        return next(CustomError.createError(error.message, 400));
    }
}
export const CreateProfile = async (req, res, next) => {
    try {
        console.log(req.file);
        await profileValidator.validateAsync(req.body);

        const { firstName, lastName, industry, gender, bio, userid } = req.body;
        if (!req.file) {
            return next(CustomError.createError("Profile image is required", 400));

        }
        const mediaType = req.file.mimetype.split("/")[0];
        const media = await mediaModel.create({ mediaType: mediaType, mediaUrl: req.file.path, userid, })
        const userModel = await user.findByIdAndUpdate(req.userId, { firstName, lastName, industry, gender, bio, isProfileCreated: true, image: media._id }, { new: true });
        if (!userModel) {
            return next(CustomError.createError("User not found", 400));

        }

        console.log(userModel);
        return next(CustomSuccess.createSuccess({ userModel }, "Profile Created Sucessfully", 200));

    } catch (err) {
        return next(CustomError.createError(err.message, 400));

    }
}