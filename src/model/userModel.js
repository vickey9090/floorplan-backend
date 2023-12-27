import mongoose from "mongoose";


const userModel = mongoose.Schema({
    firstName: {
        type: mongoose.Schema.Types.String,

    },
    lastName: {
        type: mongoose.Schema.Types.String,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,

    },
    industry: {
        type: mongoose.Schema.Types.String,

    },
    gender: {
        type: mongoose.Schema.Types.String,
        enum: ["Male", "Female"],
    },
    bio: {
        type: mongoose.Schema.Types.String,

    },
    isVerified: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },
    userType: {
        type: mongoose.Schema.Types.String,
        enum: ["User", "Client", "Business"],


    },
    isProfileCreated: {
        type: mongoose.Schema.Types.Boolean,
        default: false,
    },
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Devices"
    }],
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "media",

    }
})
export const user = mongoose.model("user", userModel);
