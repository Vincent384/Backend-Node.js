import express from "express";
import { loginUser } from "../../models/loginModel.js";
const router = express()


router.post('/',loginUser)


export default router