
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth} from "./AuthContext";


const ChatContext = createContext();

const admin = {
  id: "1",
  name: "Admin User",
  email: "admin@example.com",
  role: "admin" ,
  avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=admin"
};

const user = {
  id: "2",
  name: "Test User",
  email: "user@example.com",
  role: "user" ,
  avatarUrl: "https://api.dicebear.com/7.x/personas/svg?seed=user"
};

// Mock initial messages
const INITIAL_MESSAGES = [
  {
    id: "1",
    text: "Welcome to the Task Trophy Hub team chat!",
    sender: admin,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    text: "Thanks! I'm excited to get started on my tasks.",
    sender: user,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    text: "I've assigned you some initial tasks. Let me know if you have questions!",
    sender: admin,
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    text: "The login page is now complete. Moving on to the dashboard design.",
    sender: user,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const ChatProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  useEffect(() => {
    // In a real app, we would fetch messages from an API
    // For now, we'll use our mock data
    const savedMessages = localStorage.getItem("taskTrophyMessages");
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Failed to parse saved messages:", error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("taskTrophyMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text) => {
    if (!currentUser || !text.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: text.trim(),
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
