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
  isLogged,
} from "../controllers/auth.controllers.js";
import verifyToken from "../middleware/verifyToken.middleware.js";
import passport from "../utils/passport.utils.js";
import "dotenv/config";

const authRouter = express();

authRouter.route("/signup").post(signup);
authRouter.route("/verify").post(verifyEmail);
authRouter.route("/resend-verification-email").post(resendVerificationEmail);

authRouter.route("/signin").post(signin);


authRouter.route("/forget-password").post(forgetPassword);
authRouter.route("/reset-password/:token").post(resetPassword);

authRouter.route("/user-data").get(verifyToken, userData);

authRouter.route("/sign-out").get(signout)

authRouter.route("/islogged").get(verifyToken,isLogged)


//Google OAuth login
authRouter.route("/google").get(passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.FRONTSIDE_URL}/signin` }),
  (req, res) => {
    const user = req.user; // Typically, user is stored in req.user
    const token = user.generateAccessToken(); // Ensure this function generates a JWT

    res.cookie('token', token, {
      // httpOnly: true, // Cookie cannot be accessed via JavaScript
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      // secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
      sameSite: 'Strict', // Adjust SameSite policy as per your needs
    });

    res.redirect(`${process.env.FRONTSIDE_URL}`); // Adjust the redirection URL as needed
  }
);


// GitHub OAuth routes
authRouter.route("/github").get(passport.authenticate('github', { scope: ['user:email'] }));
authRouter.route("/github/callback").get(
  passport.authenticate('github', { failureRedirect: `${process.env.FRONTSIDE_URL}/signin` }),
  (req, res) => {
     // Extract user and token from req.authInfo
     const user = req.user; // Typically, user is stored in req.user
     const token = user.generateAccessToken(); // Ensure this function generates a JWT
 
     // Set token in an HttpOnly cookie
     res.cookie('token', token, {
      //  httpOnly: true, // Cookie cannot be accessed via JavaScript
       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      //  secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
       sameSite: 'Strict', // Adjust SameSite policy as per your needs
     });
 
    res.redirect(`${process.env.FRONTSIDE_URL}`);
  }
);




export default authRouter;