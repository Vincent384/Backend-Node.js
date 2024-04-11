import express from "express";
import { deleteMessage,postMessage } from "../../models/messageModels.js";
const router = express()


router.post('/',postMessage)
router.delete('/:id',deleteMessage)


export default router