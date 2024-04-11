import { Schema,model } from "mongoose";

const messageSchema = new Schema({
    name:{ type:String,required:true },
    email:{ type:String,required:true },
    message:{ type:String,required:true }
},{timestamps:true})


const Message = model('message',messageSchema)

export default Message