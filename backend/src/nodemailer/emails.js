import {
  emailVerificationTemplate,
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
