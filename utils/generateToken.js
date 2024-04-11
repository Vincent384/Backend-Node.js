import jwt from 'jsonwebtoken'

const generateToken = (user) =>{
    //TODO Kolla koden att den fungerar
    const token = jwt.sign({userId:user._id},process.env.SECRET_TOKEN,{ expiresIn:'1h'})
    return token
}

export default generateToken