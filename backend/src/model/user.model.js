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
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: "String",
      required: [true, "Name is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    loggedInDevice: [
      {
        userAgent: {
          type: String,
          required: [true, "UserAgent is required"],
        }, // e.g., browser and OS details
        ipAddress: {
          type: String,
          required: [true, "ipAddress is required"],

        }, // IP address of the user
        loginTime: {
          type: Date,
          required: [true, "Login time is required"],

        }, // Timestamp of the login
      },
    ],

    knownIPs: [
      {
        type: String,
      },
    ],
    resetPassowordToken: String,
    resetPassowordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    loginCode: String,
    loginCodeExpiresAt: Date,
  },

  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    console.log(error)
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