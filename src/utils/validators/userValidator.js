import joi from "joi";
export const signUpValidator = joi.object({
    name: joi.string().required(),
    userType: joi.string().required(),
    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email",
    }),
    password: joi
        .string()
        .pattern(
            new RegExp(
                /(?=[A-Za-z0-9@#$%^&+!=?*_-]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=?*_-])(?=.{8,}).*$/
            )
        )
        .messages({
            "string.pattern.base":
                "Password length should be 8 .Must include 1 uppercase 1 lowercase 1 number and 1 special character(@#$%^&+!=?*_-)",
        })
        .required(),

});

export const forgotPasswordValidator = joi.object({

    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email",
    }),


});

export const loginValidator = joi.object({

    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email",
    }),
    password: joi
        .string()


        .required(),

});

export const profileValidator = joi.object({

    firstName: joi
        .string()


        .required(),
    lastName: joi
        .string()


        .required(),

    industry: joi
        .string()


        .required(),

    gender: joi
        .string()


        .required(),

    bio: joi
        .string()


        .required(),


});
export const OtpValidator = joi.object({

    otpCode: joi.required(),
    userid: joi.required(),


});