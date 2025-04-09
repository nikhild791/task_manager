import { user_secret_token } from "../config.js";
import jwt from 'jsonwebtoken'

export function userAuth(req,res,next){
    const header = req.headers.authorization
    if(!header){
        return res.status(401).json({success:false,msg:"No headers found"})
    }
    const token = header.split(' ')[1]
    if(!token){
        return res.status(401).json({success:false,msg:"No token found"})
    }
    try{
        const data = jwt.verify(token,user_secret_token)
        if(data){
            req.userId = data.userId;
            next()
        }
    }catch(e){
        return res.status(401).json({success:false,msg:"Something bad happens",e})
    }
}