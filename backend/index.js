import app from "./app.js";
import "dotenv/config";
import connectToMongoDB from "./src/db/mongo.db.js";

const PORT =  process.env.PORT || 5000

connectToMongoDB(process.env.MONGODB_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is listening at ",PORT)
    })
    console.log("Connected to Mongo db successfull.")
})
.catch((error)=>{
    console.log("Failed to connect to Mongo DB",error)
    throw error
})