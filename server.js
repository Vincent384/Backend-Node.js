import app from "./app.js";
import mongoose from "mongoose";
import 'dotenv/config'

const PORT = process.env.PORT || 9999

const MONGO_URI = process.env.MONGO_URI

app.listen(PORT,()=>{
    console.log('listen for http://localhost:'+ PORT)
})

const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log('DB Connect')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

