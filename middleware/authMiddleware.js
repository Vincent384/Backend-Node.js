import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1] 
        const decoded = jwt.verify(token,process.env.SECRET_TOKEN)
        // Sparar/hämtar id från user'
        req.userId = decoded.userId
        next()
    } catch (error) {
     res.status(401).json({
        message:'Unautherized'
     })   

    }
}
