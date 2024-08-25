import {
  sendVerificationEmail,
  sendWellcomeEmail,
} from "../nodemailer/emails.js";
import { User } from "../model/user.model.js";
import otpGenerator from "otp-generator";

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        error: "User Already exists",
        statusCode: 400,
      });
    }

    const generateOTPToken = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const user = new User({
      email,
      password,
      name,
      verificationToken: generateOTPToken,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000, //1 hours
    });

    await user.save();

    res.cookie("token", user.generateAccessToken(), {
      httpOnly: true,
      maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000, //7days
    });

    await sendVerificationEmail(user.email, generateOTPToken);

    return res.status(200).json({
      success: true,
      message: "User signup successfull",
      statusCode: 201,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
};

const verifyEmail = async (req, res) => {
  const email = req.query.email;
  const codeUrl = req.query.code;

  const { code } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email is required.",
      statusCode: 400,
    });
  }

  if (!code && !codeUrl) {
    return res.status(400).json({
      success: false,
      error: "Verification code is required.",
      statusCode: 400,
    });
  }

  const user = await User.findOne({
    verificationToken: code || codeUrl,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  
  if (!user) {
    return res.status(400).json({
      success: false,
      error: "Invalid or expired verification code.",
      statusCode: 400,
    });
  }

  
  user.verificationToken = null;
  user.verificationTokenExpiresAt = null;
  user.isVerified = true;

  await user.save();

  sendWellcomeEmail(user.email);

  return res.status(200).json({
    success: true,
    message: "Email verified successfull.",
    statusCode: 200,
  });
};

export { signup, verifyEmail };