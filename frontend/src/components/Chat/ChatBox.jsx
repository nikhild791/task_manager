import { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { format } from "date-fns";



const ChatBox = () => {
  
  const { messages, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const formatMessageTime = (dateString) => {
       return format(new Date(dateString), "PPP");
   
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold  text-gray-900 dark:text-white">Team Chat</h2>
      </div>
      <div className="max-h-[73vh] overflow-x-hidden flex flex-col  overflow-y-scroll">

      
      <div className="flex-1 p-4 mb-8  space-y-4">
        {messages && messages.map((message,index) => (
          <div key={index} className="animate-fade-in">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                {message.role==='admin'?<AvatarImage className='bg-red-500' src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.senderName}`} alt={message.senderName} />:<AvatarImage className='bg-blue-500' src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.senderName}`} alt={message.senderName} />
                }
                <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                  {getInitials(message.senderName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">{message.senderName}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
                <div className="mt-1 text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-gray-900 dark:text-gray-100">
                  {message.message}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 absolute bottom-5   flex flex-row  dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 w-[63vw] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default ChatBox;
