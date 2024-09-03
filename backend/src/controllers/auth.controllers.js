import {
  sendLoginCodeEmail,
  sendLoginNotification,
  sendVerificationEmail,
  sendWellcomeEmail,
} from "../nodemailer/emails.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const loggedInDevice = {
    "userAgent" : "null",
    "ipAddress" : "null",
    "loginTime": new Date(),
  };
  try {
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        error: "User Already exists.",
        statusCode: 400,
      });
    }
    const verificationCode = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const user = new User({
      email,
      password,
      name,
      verificationToken: verificationCode,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000, //1 hours
      loggedInDevice
    });

    await user.save();

    await sendVerificationEmail(user.email, verificationCode);

    return res.status(200).json({
      success: true,
      message:
        "User signup successfull. Go to email and verify the email address",
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

  const { code, ipAddress } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: "Email is required.",
      statusCode: 400,
    });
  }

  if (!ipAddress) {
    return res.status(400).json({
      success: false,
      error: "Ip address is required.",
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

  try {
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

    if (!user.knownIPs.includes(ipAddress)) {
      user.knownIPs.push(ipAddress);
    }

    await user.save();

    sendWellcomeEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Email verified successful.",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
};

const signin = async (req, res) => {
  const verificationCode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const loginCode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  try {
    const { email, password, ipAddress, userAgent } = req.body;
    const loggedInDevice = {
      userAgent,
      ipAddress,
      loginTime: new Date(),
    };
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials.",
        statusCode: 400,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        error: "Email or password is invalid.",
        statusCode: 400,
      });
    }

    if (!user.isVerified) {
      (user.verificationToken = verificationCode),
        (user.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000), //1 hours
        await user.save();
      await sendVerificationEmail(user.email, verificationCode, user.name);
      return res.status(400).json({
        message: "Verify your email.",
      });
    }

    if (!user.knownIPs.includes(ipAddress)) {
      user.loginCode = loginCode;
      user.loginCodeExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
      user.save();
      sendLoginCodeEmail(user.email, loginCode,user.name);
      return res.json({
        message: "New device deceted! Check your email for code.",
      });
    }

       const data = []
      

      for (let i = 0; i < user.loggedInDevice.length; i++) {
        if (
          !user.loggedInDevice[i].ipAddress.includes(ipAddress)
        ) {
          data.push("not match")
        }else{
          data.push("match")
        }
        
      }
   

      if(!data.includes("match")){
          user.loggedInDevice.push(loggedInDevice);
      }

    await user.save();

    res.cookie("token", user.generateAccessToken(), {
      httpOnly: true,
      maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000, //7days
    });
    sendLoginNotification(user.email,userAgent,ipAddress,user.name)

    return res.status(200).json({
      success: true,
      message: "Signin successful.",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
};

const verifyLoginCode = async (req, res) => {
  const email = req.query.email;
  const { code, userAgent, ipAddress } = req.body;
  const loggedInDevice = {
    userAgent,
    ipAddress,
    loginTime: new Date(),
  };
  try {
    if (!code) {
      return res.status(400).json({
        success: false,

        error: "Verification code is required.",
        statusCode: 400,
      });
    }
    const user = await User.findOne({
      loginCode: code,
      loginCodeExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired verification code.",
        statusCode: 400,
      });
    }

    user.loginCode = null;
    user.loginCodeExpiresAt = null;


      const data = []
      

      for (let i = 0; i < user.loggedInDevice.length; i++) {
        if (
          !user.knownIPs.includes(ipAddress) &&
          !user.loggedInDevice[i].ipAddress.includes(ipAddress)
        ) {
          data.push("not match")
        }else{
          data.push("match")
        }
        
      }
   

      if(!data.includes("match")){
          user.loggedInDevice.push(loggedInDevice);
      }


    if (!user.knownIPs.includes(ipAddress)) {
      user.knownIPs.push(ipAddress);
    }

    await user.save();

    sendLoginNotification(user.email,userAgent,ipAddress,user.name)

    return res.status(200).json({
      success: true,
      message: "Login verification successful.",
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
};

export { signup, verifyEmail, signin, verifyLoginCode };