import express from "express";
import cors from 'cors'
import productsController from "./controllers/mode/productsController.js";
import messsageController from "./controllers/mode/messsageController.js";
import registerController from "./controllers/mode/registerController.js";
import loginController from './controllers/mode/loginController.js'
import orderController from './controllers/mode/orderController.js'
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())

app.use('/api/products',productsController)
app.use('/api/messages',messsageController)
app.use('/api/register',registerController)
app.use('/api/login',loginController)
app.use('/api/orders',orderController)

export default app