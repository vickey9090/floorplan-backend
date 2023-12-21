import mongoose from 'mongoose';

const Devices = mongoose.Schema({
    deviceId: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    deviceType: {
        type: mongoose.Schema.Types.String,
        enum: ["Android", "Ios", "Postman"],

    },
    deviceToken: {
        type: mongoose.Schema.Types.String,

    }
})

export const deviceModel= mongoose.model("device",Devices);