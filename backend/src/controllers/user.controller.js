import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { user_secret_token } from "../config.js";

const prisma = new PrismaClient()

export async function signin(req,res){
    const {adminname,username, password} = req.body;
    const admin = await prisma.admin.findFirst({where:{
        username:adminname,
    }})
    
    if(!admin){
        return res.status(401).json({success:false, msg:"Invalid creadentials a"})
    }
    const user = await prisma.user.findFirst({where:{
        username,
        adminId:admin.id
    }})
    if(!user){
        return res.status(401).json({success:false, msg:"Invalid creadentials u"})
    }
    if(user.password != password){
        return res.status(401).json({success:false, msg:"Invalid creadentials p"})
    }
    const token  = jwt.sign({userId:user.id},user_secret_token,{expiresIn:'1d'})
    return res.status(201).json({success:true, msg:"user logged in ",token})

    

}
export async function userProfile(req,res){
    const userId = req.userId
    const user = await prisma.user.findUnique({where:{
        id:userId
    },select:{
        username:true,
        id:true,
        adminId:true
    }})
    if(!user){
        return res.status(404).json({success:false, msg:"No user found"})
    }
    return res.status(200).json({success:true, msg:"user details",user,role:'user'})
}
export async function changeUserPassword(req,res){
    const userId = req.userId
    const {oldpassword,newpassword} = req.body;
    const user = await prisma.user.findUnique({where:{
        id:userId
    }})
    if(!user){
        return res.status(404).json({success:false, msg:"No user found"})
    }
    if(user.password != oldpassword){
        return res.status(404).json({success:false, msg:"Incorrect old password"})

    }
    await prisma.user.update({where:{
        id:userId
    },
    data:{
        password:newpassword
    }
    })
    res.status(200).json({success:true, msg:"password updated successfully successfully"})

}

export async function updateTask(req,res){
    const {taskId,status} = req.body
    const userId = req.userId
    if(!taskId){
        return res.status(404).json({success:false,msg:"No taskId found"})
    }
    if(!userId){
        return res.status(404).json({success:false,msg:"No userId found"})
    }
    const task =await prisma.task.findUnique({where:{
        id:taskId
    }})
    if(!task){
        return res.status(404).json({success:false,msg:"No task found"})
    }
    if(task.userId != userId){
        return res.status(404).json({success:false,msg:"You don't have authority to update this task"})
    }
   
    await prisma.task.update({where:{
        id:taskId
    },
    data:{
        status,
        completedAt:new Date()
    }        
})
res.status(200).json({success:true, msg:"task updated successfully"})

}

export async function allTask(req,res){
    const userId = req.userId
    const tasks = await prisma.task.findMany({
        where:{
            userId
        }
    })
    return res.status(200).json({success:true, msg:"all the users",tasks})   
}

export async function getAdmin(req,res) {
    const userId = req.userId
    const user = await prisma.user.findFirst({where:{
        id:userId
    }})
    if(user){
        const userAdmin =await prisma.admin.findFirst({where:{
            id:user.adminId
        },
        select:{
            username:true
        }
    })
    console.log(userAdmin)
    res.status(200).json({success:true,msg:'user admin info',userAdmin})
}
}