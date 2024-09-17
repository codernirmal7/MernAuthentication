// src/config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {User} from "../model/user.model.js";
import { Strategy as GitHubStrategy } from "passport-github2";

//Google

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (user && !user.googleId && !user.githubId) {
      // User exists but has signed up with local strategy (email/password)
      return done(null, false, { message: "Please sign in with your password because you signed up with email/password." });
    } 
    if(!user){
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        lastTimeLogin : Date.now()
      });
      await user.save()
      sendWellcomeEmail(profile.emails[0].value);

    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));


//Github
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "/api/auth/github/callback"
},

async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (user && !user.githubId && !user.googleId) {
      // User exists but has signed up with local strategy (email/password)
      return done(null, false, { message: "Please sign in with your password because you signed up with email/password." });
    }
    if(!user){
      user = await User.create({
        githubId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        lastTimeLogin : Date.now()
      });
      await user.save()
      sendWellcomeEmail(profile.emails[0].value);

    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;