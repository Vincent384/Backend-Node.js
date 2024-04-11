import express from "express";
import { getRegisteredUser,createNewUser,updateUser,deleteUser } from "../../models/registerModel.js";
const router = express()

router.get('/',getRegisteredUser)
router.post('/',createNewUser)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)


export default router