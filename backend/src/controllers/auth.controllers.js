import {
  sendLoginNotification,
  sendResetPasswordEmail,
  sendResetPasswordSuccessfulEmail,
  sendVerificationEmail,
  sendWellcomeEmail,
} from "../nodemailer/emails.js";
import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";

const signup = async (req, res) => {
  const {name, email, password } = req.body;
  try {
    if(password.length <8){
      return res.status(400).json({
        success: false,
        error: "Password length must be greater 8.",
        statusCode: 400,
      });
    }
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        error: "User Already exists.",
        statusCode: 400,
      });
    }
    const verificationCode = otpGenerator.generate(6, {
      digits : true,
      lowerCaseAlphabets : false,
      upperCaseAlphabets : false,
      specialChars : false
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password : hashedPassword,
      name,
      verificationToken: verificationCode,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000, //1 hours
    });

    user.oldPasswords.push(hashedPassword)

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
    digits : true,
    lowerCaseAlphabets : false,
    upperCaseAlphabets : false,
    specialChars : false
  });
 
  try {
    const { email, password, ipAddress, userAgent } = req.body;
   
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

    if(user.isDisable){
      return res.status(400).json({
        success: false,
        error: "Your account is disable.",
        statusCode: 400,
      });
    }

   
   

    res.cookie("token", user.generateAccessToken(), {
      // httpOnly: true,
      maxAge: Date.now() + 7 * 24 * 60 * 60 * 1000, //7days
    });

    sendLoginNotification(user.email, userAgent, ipAddress, user.name);

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


const forgetPassword = async (req, res) => {
  const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Please a enter email address",
        statusCode: 400,
      });
    }
  try {
    
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({
        success: false,
        error: "Email address is not registered in our database",
        statusCode: 400,
      });
    }
    if(userExists.isDisable){
      return res.status(400).json({
        success: false,
        error: "Your account is disable.",
        statusCode: 400,
      });
    }
   
    const resetPasswordToken = otpGenerator.generate(25, {
      digits : true,
      lowerCaseAlphabets : false,
      upperCaseAlphabets : false,
      specialChars : false
    });

    userExists.resetPasswordToken = resetPasswordToken;
    userExists.resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hours

    await userExists.save();


    sendResetPasswordEmail(email, resetPasswordToken, userExists.name);

    return res.status(200).json({
      success: true,
      message: "Email send successful go and reset the password.",
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

const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const resetPasswordToken  = req.params.token;
  try {
    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken.split(":")[1],
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired link.",
        statusCode: 400,
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        error: "Please enter a password",
        statusCode: 400,
      });
    }
    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Please enter a confirm password",
        statusCode: 400,
      });
    }
    if(confirmPassword !== password ){
      return res.status(400).json({
        success: false,
        error: "Confirm password must be match with password",
        statusCode: 400,
      });
    }

    const data = [];

    for (let i = 0; i < user.oldPasswords.length; i++) {
      if (await bcrypt.compare(password,user.oldPasswords[i])) {
        data.push("match");
      } else {
        data.push("not match");
      }
    }

    if (data.includes("match")) {
      return res.status(400).json({
        success: false,
        error: "You have already used this password.",
        statusCode: 400,
      });
    }
    

    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiresAt = null;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.oldPasswords.push(hashedPassword)


    await user.save();

    sendResetPasswordSuccessfulEmail(user.email,user.name)

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
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

const resendVerificationEmail = async (req,res)=>{
  const {email} = req.body

  if(!email){
    return res.status(400).json({
      success: false,
      error: "Email is required",
      statusCode: 400,
    });
  }
  try {
      
    const userExists = await User.findOne({email})

    if(!userExists){
      return res.status(400).json({
        success: false,
        error: "Invalid credentials.",
        statusCode: 400,
      });
    }

    if(userExists.isVerified){
      return res.status(400).json({
        success: false,
        error: "Your email address is already verified",
        statusCode: 400,
      });
    }

    const verificationCode = otpGenerator.generate(6, {
      digits : true,
      lowerCaseAlphabets : false,
      upperCaseAlphabets : false,
      specialChars : false
    });
  
  
    userExists.verificationToken = verificationCode
    userExists.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000, //1 hours
  
    await userExists.save();
  
    await sendVerificationEmail(email, verificationCode);
  
    return res.status(200).json({
      success: true,
      message:
        "Email verification mail was sent successful",
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
}



const userData = async (req,res)=>{
  try {
    const userData = req.userData
    return res.status(200).json({
      success: true,
      message: userData,
      error : null,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
}

const signout = async (req,res)=>{
  try {
    res.clearCookie("token")
    return res.status(200).json({
      success: true,
      message: "Sign out successful.",
      error : null,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
}

export {
  signup,
  verifyEmail,
  signin,
  forgetPassword,
  resetPassword,
  resendVerificationEmail,
  userData,
  signout
};