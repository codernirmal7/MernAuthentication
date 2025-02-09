import {
  emailVerificationTemplate,
  loginCodeTemplate,
  loginNotificationTemplate,
  resetPasswordSuccessfulTemple,
  resetPasswordTemplate,
  WELLCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import "dotenv/config";
import { transporter } from "./nodemailer.config.js";

const sender = process.env.NODEMAILER_EMAIL;

export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Verify your email",
    html: emailVerificationTemplate(
      verificationCode,
      `${process.env.FRONTSIDE_URL}/auth/verify?email=${email}&code=${verificationCode}`
    ),
    category: "Email Verification",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while sending email", error);
      } else {
      }
    });
  } catch (error) {
    console.log("Server error", error);
  }
};

export const sendLoginCodeEmail = async (email, loginCode, name) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Your Login Code",
    html: loginCodeTemplate(name, loginCode),
    category: "Email Login Code",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while sending email", error);
      } else {
      }
    });
  } catch (error) {
    console.log("Server error", error);
  }
};

export const sendLoginNotification = async (email, userAgent, ipAddress, name) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "New Device Login",
    html: loginNotificationTemplate(userAgent, ipAddress, name),
    category: "Login Notification",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while sending email", error);
      } else {
      }
    });
  } catch (error) {
    console.log("Server error", error);
  }
};

export const sendWellcomeEmail = async (email) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Welcome to MernAuth!",
    html: WELLCOME_EMAIL_TEMPLATE,
    category: "Welcome Email",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while sending email", error);
      } else {
      }
    });
  } catch (error) {
    console.log("Server error", error);
  }
};

export const sendResetPasswordEmail = async (email,resetPasswordToken,name) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Reset Password",
    html: resetPasswordTemplate(`${process.env.FRONTSIDE_URL}/auth/reset-password/${resetPasswordToken}`,name),
    category: "Reset Password!",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while sending email", error);
      } else {
      }
    });
  } catch (error) {
    console.log("Server error", error);
  }
};


export const sendResetPasswordSuccessfulEmail = async (email,name) => {
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Reset Password Successful",
    html: resetPasswordSuccessfulTemple(name,`${process.env.FRONTSIDE_URL}/signin`),
    category: "Reset Password Successful",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error while sending email", error);
      } else {
      }
    });
  } catch (error) {
    console.log("Server error", error);
  }
};