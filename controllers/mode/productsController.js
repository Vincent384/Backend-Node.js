import express from 'express'
import { getOneProduct, getAllProducts,updateProduct,deleteProduct,createProduct } from '../../models/productsModels.js'
const router = express.Router()
import { verifyToken } from '../../middleware/authMiddleware.js'

router.get('/',getAllProducts)
router.get('/:id',getOneProduct)
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)





export default router
