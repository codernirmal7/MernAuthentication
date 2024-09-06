import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid Email is required"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,

    },
    name: {
      type: "String",
      required: [true, "Name is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
 
    googleId: { type: String },
    githubId: { type: String },
   
    knownIPs: [
      {
        type: String,
      },
    ],
    oldPasswords: [
      {
        type: String,
      },
    ],
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    loginCode: String,
    loginCodeExpiresAt: Date,

    isDisable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: {
      createdAt: true,
    },
  }
);



UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      isDisable: this.isDisable,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "7d" }
  );
};

export const User = mongoose.model("User", UserSchema);