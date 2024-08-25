import nodemailer from "nodemailer"
import "dotenv/config"


export const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail service
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your Gmail address
    pass: process.env.NODEMAILER_PASSWORD, // Your Gmail app password
  },
})