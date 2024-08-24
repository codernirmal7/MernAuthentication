import express from "express"
import authRouter from "./src/routes/auth.routes.js"

const app = express()

app.use("/api/auth",authRouter)


export default app