import express from "express"
const authRouter = express()

authRouter.route("/signup").get((req,res)=>{
    res.send("signup")
})

export default authRouter