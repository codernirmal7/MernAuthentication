import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Valid Email is required"],
      required: [true , "Email is required"],
    },
    password: {
      type: String,
      required: [true , "Password is required"],

    },
    name: {
      type: "String",
      required: [true , "Name is required"],

    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPassowordToken: String,
    resetPassowordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "7d" }
  );
};

export const User = mongoose.model("User", UserSchema);