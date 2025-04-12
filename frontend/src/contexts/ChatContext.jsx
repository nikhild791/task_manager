
import React, { createContext, useContext, useState, useEffect,useRef } from "react";
import { useAuth} from "./AuthContext";
import { authService, userService } from "../api/admin";

const ChatContext = createContext();



export const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { currentUser, role } = useAuth();
  const [messages, setMessages] = useState([]);
  const [roomId,setRoomId] = useState()

  // Step 1: Fetch adminId first
  useEffect(() => {
    const fetchAdminIdAndConnect = async () => {
      let res;
      if (role === 'admin') {
        res = await authService.adminProfile();
        setRoomId(res.admin.id)
        connectWebSocket(res.admin.id);
      } else {
        res = await userService.userProfile();
        setRoomId(res.user.adminId)
        connectWebSocket(res.user.adminId);
      }
    };

    fetchAdminIdAndConnect();

    return () => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [role]);

  const connectWebSocket = (roomId) => {
    socketRef.current = new WebSocket('ws://localhost:8080');

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      socketRef.current.send(
        JSON.stringify({
          type: 'join',
          roomId: roomId
        })
      );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
     
      if(data.type === 'message'){
        setMessages(prev => [...prev, data.message]);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };



  
    const sendMessage = (text) => {
      if (!currentUser || !text.trim()) return;
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: 'chat',
            roomId: roomId,
            message:text,
            sender:currentUser
          })
        );
      } else {
        console.warn('WebSocket is not open.');
      }
    
    const newMessage = {
      type: 'chat',
      id: Date.now().toString(),
      message: text.trim(),
      sender: currentUser,
      timestamp: new Date().toISOString()
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
