import express from "express"
import { signup, verifyEmail } from "../controllers/auth.controllers.js"
const authRouter = express()

authRouter.route("/signup").post(signup)
authRouter.route("/verify").post(verifyEmail)

export default authRouter