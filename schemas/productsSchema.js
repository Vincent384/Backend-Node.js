import { Schema,model } from "mongoose";


const productsSchema = new Schema({
    name:{ type:String, required:true, },
    price:{ type:Number, default:0 } ,
    description:{ type:String, required:true },
    category:{ type:String,required:true },
    images:[{ type:String }],
},{timestamps:true})


const Product = model('Product',productsSchema)

export default Product