import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { authService, userService } from "../api/admin";
import { apiHelpers } from "../api/axios";
import { toast } from "react-toastify";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const { currentUser, role, isAuthenticated } = useAuth();

  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [error, setError] = useState(null);

  // Function to fetch initial messages
  const fetchInitialMessages = useCallback(
    async (adminId) => {
      try {
        setIsLoading(true);
        const data =
          role === "admin"
            ? await authService.getInitialMessage(adminId)
            : await userService.getInitialMessage(adminId);

        setMessages(data.messages || []);
        return true;
      } catch (error) {
        const errorMsg = apiHelpers.handleError(error);
        setError(errorMsg.message);
        toast.error(`Failed to load messages: ${errorMsg.message}`);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [role]
  );

  // Initialize WebSocket connection
  const connectWebSocket = useCallback(
    (roomId) => {
      // Clear any existing connection
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.close();
      }

      try {
        setConnectionStatus("connecting");
        const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8080";
        socketRef.current = new WebSocket(wsUrl);

        socketRef.current.onopen = () => {
          setConnectionStatus("connected");
          console.log("WebSocket connected");

          // Join room
          socketRef.current.send(
            JSON.stringify({
              type: "join",
              roomId: roomId,
            })
          );
        };

        socketRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type === "message") {
              setMessages((prev) => [...prev, data.message]);
            } else if (data.type === "error") {
              toast.error(data.message);
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        socketRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
          setConnectionStatus("error");
          setError("Connection error");
        };

        socketRef.current.onclose = () => {
          setConnectionStatus("disconnected");

          // Attempt to reconnect after delay
          if (isAuthenticated && roomId) {
            reconnectTimeoutRef.current = setTimeout(() => {
              connectWebSocket(roomId);
            }, 3000);
          }
        };
      } catch (err) {
        console.error("Failed to establish WebSocket connection:", err);
        setConnectionStatus("error");
        setError("Failed to connect to chat server");
      }
    },
    [isAuthenticated]
  );

  // Setup WebSocket connection and fetch messages when authenticated
  useEffect(() => {
    const fetchAdminIdAndConnect = async () => {
      if (!isAuthenticated || !currentUser) {
        setError("Please sign in to access chat");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        let res;

        if (role === "admin") {
          res = await authService.adminProfile();
          setRoomId(res.admin.id);
          await fetchInitialMessages(res.admin.id);
          connectWebSocket(res.admin.id);
        } else {
          res = await userService.userProfile();
          setRoomId(res.user.adminId);
          await fetchInitialMessages(res.user.adminId);
          connectWebSocket(res.user.adminId);
        }
      } catch (error) {
        const errorMsg = apiHelpers.handleError(error);
        setError(errorMsg.message);
        toast.error(`Authentication error: ${errorMsg.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAdminIdAndConnect();
    }

    return () => {
      // Clean up
      if (socketRef.current) {
        socketRef.current.close();
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [
    role,
    isAuthenticated,
    currentUser,
    connectWebSocket,
    fetchInitialMessages,
  ]);

  // Send message function
  const sendMessage = useCallback(
    (text) => {
      if (!currentUser || !text.trim() || !roomId) {
        toast.warn("Cannot send message: you may not be connected");
        return;
      }

      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        // Create message object
        const messageData = {
          type: "chat",
          roomId: roomId,
          message: text.trim(),
          senderName: currentUser,
          role: role,
        };

        // Send via WebSocket
        socketRef.current.send(JSON.stringify(messageData));

        // Optimistically add to local state
        const newMessage = {
          id: Date.now().toString(),
          message: text.trim(),
          senderName: currentUser,
          role: role,
          createdAt: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        toast.error("Connection lost. Trying to reconnect...");

        // Try to reconnect and then send the message
        if (connectionStatus !== "connecting") {
          connectWebSocket(roomId);
        }
      }
    },
    [currentUser, roomId, role, connectionStatus, connectWebSocket]
  );

  // Context value
  const contextValue = {
    messages,
    sendMessage,
    isLoading,
    connectionStatus,
    error,
    reconnect: () => roomId && connectWebSocket(roomId),
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
