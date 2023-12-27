import mongoose from "mongoose";

const media = mongoose.Schema({
    mediaType: {
        type: mongoose.Schema.Types.String,
    },
    mediaUrl: {
        type: mongoose.Schema.Types.String,

    },
    userid: {
        type: mongoose.Schema.Types.String,
        // ref: "userModel",

    },
    thumbnailUrl: {
        type: mongoose.Schema.Types.String,
        default: "",
    },
});

export const mediaModel = mongoose.model("media", media); 