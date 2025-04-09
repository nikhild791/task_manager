import { admin_secret_token } from "../config.js";
import jwt from 'jsonwebtoken'

export function adminAuth(req,res,next){
    const header = req.headers.authorization
    if(!header){
        return res.status(401).json({success:false,msg:"No headers found"})
    }
    const token = header.split(' ')[1]
    if(!token){
        return res.status(401).json({success:false,msg:"No token found"})
    }
    try{
        const data = jwt.verify(token,admin_secret_token)
        if(data){
            req.adminId = data.adminId;
            next()
        }
    }catch(e){
        return res.status(401).json({success:false,msg:"Something bad happens",e})
    }
}