import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { use } from "react";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    avatar: {
        type: String,  //cloudinary url
        required: true,
    },
    coverimage: {
        type: String,  //cloudinary url
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WatchHistory",
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String,
    },
},
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email, username: this.username},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    return token;
};
userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        { _id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    );
    return token;
};

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign(
//         { _id: this._id, email: this.email },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//     );
//     return token;
// };

export const User = model("User", userSchema);
