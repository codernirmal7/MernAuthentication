import express from "express";
import {
  signup,
  verifyEmail,
  signin,
  forgetPassword,
  resetPassword,
  resendVerificationEmail,
  userData,
  signout,
} from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.middleware.js";
import passport from "../utils/passport.utils.js";
const authRouter = express();

authRouter.route("/signup").post(signup);
authRouter.route("/verify").post(verifyEmail);
authRouter.route("/resend-verification-email").post(resendVerificationEmail);

authRouter.route("/signin").post(signin);

authRouter.route("/forget-password").post(forgetPassword);
authRouter.route("/reset-password/:token").post(resetPassword);

authRouter.route("/user-data").get(verifyToken, userData);

authRouter.route("/sign-out").get(signout)


//Google OAuth login
authRouter.route("/google").get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle the callback after Google authentication
authRouter.route("/google/callback").get(
  passport.authenticate('google', { failureRedirect: '/api/auth/signin' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

// GitHub OAuth routes
authRouter.route("/github").get(passport.authenticate('github', { scope: ['user:email'] }));
authRouter.route("/github/callback").get(
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

export default authRouter;