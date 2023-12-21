import mongoose from "mongoose";

const otp = new mongoose.Schema({
      userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    otpKey: {
        type: mongoose.Schema.Types.String,
    },
    expiry: {
        type: mongoose.Schema.Types.Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
    isexpiry: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },
})
export const OtpTable = mongoose.model("otp", otp);