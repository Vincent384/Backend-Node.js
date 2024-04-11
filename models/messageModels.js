import Message from "../schemas/messageSchema.js";
import mongoose from 'mongoose'

export const postMessage = async (req,res)=>{
    try {
        const { name, email, message } = req.body

        if(!name || !email || !message){
            res.status(400)
            throw new Error('Please fill all the required fields')
        }

        const newMessage = await Message.create({ name,email,message })
       
    
        res.status(200).json({
            message:'Message recieved'
        })

    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

export const deleteMessage = async (req,res)=>{
    try {
        
        const id = req.params.id

        if(!mongoose.isValidObjectId(id)){
            res.status(400)
            throw new Error('Please provide with a valid Id')
        }

        const deleteMessage = await Message.findByIdAndDelete(id)

        if(!deleteMessage){
            res.status(404)
            throw new Error('Message not found')
        }

        res.status(200).json(deleteMessage)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
    

}