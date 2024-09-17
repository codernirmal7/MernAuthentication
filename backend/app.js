import express from "express"
import authRouter from "./src/routes/auth.routes.js"
import cookieParser from "cookie-parser"
import passport from "passport"
import session from "express-session"

const app = express()



app.use(express.json())
app.use(cookieParser())

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
  res.send("<a href='/api/auth/google'>Login with Google</a>")
})

app.use("/api/auth",authRouter)


app.get('/profile', (req, res) => {
    if (!req.isAuthenticated) {
      return res.redirect('/');
    }
    res.send(`Hello, ${req.user.name}`);
  });
  
  // Logout
  app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  });


export default app