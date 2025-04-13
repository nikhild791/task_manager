import { WebSocketServer } from 'ws';
import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient()

const wss = new WebSocketServer({ port: 8080 });

export const messageRetrivel = async(req,res)=>{
    const roomId = parseInt(req.params.roomId);
    const response = await prisma.message.findMany({where:{
        roomId
    }})
    if(response){
    return    res.status(200).json({success:true,msg:"here all data",messages:response})
    }
    res.status(404).json({success:false,msg:"internal server error"})

}

let ChatRoom=[]

async function savedChat(mx){
    try{
       await prisma.message.create({
        data:
        { message:mx.message, 
        senderName: mx.senderName,
        roomId :mx.roomId,
        role : mx.role}})
        }
        catch(e){
              console.log('error while saving message',e)  
            }}


wss.on('connection', function connection(ws) {
    ws.send(JSON.stringify({type:'warning',message:'we are connected'}))
    console.log('chatroom',ChatRoom)

    ws.on('open',()=>{
        console.log('we are connected')
    })

  ws.on('message', function message(data) {
      data = JSON.parse(data.toString())
      console.log(data)
    if(data.type === 'join'){
        if(!data.roomId){
            ws.send(JSON.stringify({type:'warning',message:'Enter roomId first'}))
        }
        const room =ChatRoom.find((a)=>a.roomId === data.roomId )
        if(room){
            const existingUser = room.member.find((a)=>a === ws )
            if(existingUser){
                ws.send(JSON.stringify({type:'warning',message:'you are already existing '}))
                return
            }
            
            room.member.push(ws)
            ws.send(JSON.stringify({type:'warning',message:'you entered the room chat'}))
            return
        }
        ChatRoom.push({roomId:data.roomId,member:[ws]})
        ws.send(JSON.stringify({type:'warning',message:'new room is created ask everyone to join it'}))
        return
    }
    if(data.type === 'chat'){
        if(!data.roomId){
            ws.send(JSON.stringify({type:'warning',message:'Enter roomId first'}))
        }
        let room =ChatRoom.find((a)=>a.roomId === data.roomId )
        if(!room){
            ws.send(JSON.stringify({type:'warning',message:'Enter roomId first'}))
            return
        }
        savedChat(data)
       
        const allUsers = room.member.filter((a)=>a != ws)
        allUsers.map((socket)=>{
            socket.send(JSON.stringify({type:'message',message:{...data,createdAt:new Date()}}))

        })
        
        return
    }
  
  });

  ws.on('close',()=>{
    console.log('closing the connection')
    ws.send(JSON.stringify('closing the connection'))
  })

});

