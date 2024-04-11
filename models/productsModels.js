import mongoose from 'mongoose'
import Product from '../schemas/productsSchema.js'


export const getAllProducts = async(req,res) => {
    try {
    const getData = await Product.find()
        
        if(!getData){
            res.status(404)
            throw new Error('Could not find')
        }
        
        res.status(200).json(getData)

    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

export const createProduct = async(req,res)=>{
        try {
            const { name,price,description,category,images } = req.body
        
            if(!name || !price || !description || !category || !images){
                res.status(400)
                throw new Error('You need to enter all the fields correctly')
            }

            const newProduct = await Product.create({name,price,description,category,images})
            res.status(201).json(newProduct)

        } catch (error) {
            res.json({
                message:error.message
            })
        }
}

export const getOneProduct = async(req,res)=>{
    try {
        const id = req.params.id
        
        const findProduct = await Product.findById(id)

        if(!findProduct){
            res.status(404)
            throw new Error('Did not found the product')
        }
        
        res.status(200).json(findProduct)

    } catch (error) {
        res.json({
            message:error.message
        })        
    }
}


export const updateProduct = async(req,res)=>{
    try {
        const id = req.params.id
        
            if(!mongoose.isValidObjectId(id)){
                res.status(400)
                throw new Error('Please provide with a valid Id')
            }

            const findProductAndUpdate = await Product.findByIdAndUpdate(id,req.body)
            if(!findProductAndUpdate){
                res.status(404)
                throw new Error('Did not found the product')
            }

            res.status(200).json(findProductAndUpdate)

        } catch (error) {
            res.json({
                message:error.message
            })
        }
}

export const deleteProduct = async(req,res)=>{
    try {
        const id = req.params.id

        if(!mongoose.isValidObjectId(id)){
            res.status(400)
            throw new Error('Please provide with a valid Id')
        }
        
        const deleteProduct = await Product.findByIdAndDelete(id)

        if(!deleteProduct){
            res.status(404)
                throw new Error('Did not found the product')
        }

        res.status(200).json(deleteProduct)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}