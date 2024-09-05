import express from "express";
import {
  signup,
  verifyEmail,
  signin,
  verifyLoginCode,
  forgetPassword,
  resetPassword,
  resendVerificationEmail,
  resendLoginCodeEmail,
  userData,
} from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.middleware.js";
const authRouter = express();

authRouter.route("/signup").post(signup);
authRouter.route("/verify").post(verifyEmail);
authRouter.route("/resend-verification-email").post(resendVerificationEmail);

authRouter.route("/signin").post(signin);
authRouter.route("/verify-login-code").post(verifyLoginCode);
authRouter.route("/resend-login-code").post(resendLoginCodeEmail);

authRouter.route("/forget-password").post(forgetPassword);
authRouter.route("/reset-password:token").post(resetPassword);

authRouter.route("/user-data").get(verifyToken, userData);

export default authRouter;