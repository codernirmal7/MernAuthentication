import express from "express"
import { signup, verifyEmail, signin, verifyLoginCode } from "../controllers/auth.controllers.js"
const authRouter = express()

authRouter.route("/signup").post(signup)
authRouter.route("/verify").post(verifyEmail)

authRouter.route("/signin").post(signin)
authRouter.route("/verify-login-code").post(verifyLoginCode)


export default authRouter