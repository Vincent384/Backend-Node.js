import express from "express";
import { createOrder, getOrders,getOneOrder } from "../../models/orderModel.js";
import { verifyToken } from "../../middleware/authMiddleware.js";
const router = express()


router.get('/',verifyToken,getOrders)
router.post('/',verifyToken,createOrder)
router.put('/:id',verifyToken,getOneOrder)




export default router