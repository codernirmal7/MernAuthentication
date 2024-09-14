import mongoose  from "mongoose"

const connectToMongoDB = async (URI)=>{
    if(!URI){
        console.log("URI not provided")
    }

    await mongoose.connect(URI)
}
export default connectToMongoDB