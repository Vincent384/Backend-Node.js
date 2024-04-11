import { Schema,model } from "mongoose";

const orderProducts = new Schema({
    quantity:{
        type:Number,
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    }
})

const orderSchema = new Schema({
    products:[orderProducts],
    totalPrice:{
        type:Number,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
},{timestamps:true})


const Order = model('Order',orderSchema)

export default Order
