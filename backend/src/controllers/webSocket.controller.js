import { WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.WS_PORT || 8080;

// Initialize WebSocket server
const wss = new WebSocketServer({ port: PORT });
console.log(`WebSocket server started on port ${PORT}`);

// Store chat rooms with their members
let chatRooms = [];

// Controller to retrieve messages
export const messageRetrivel = async (req, res) => {
  try {
    const roomId = parseInt(req.params.roomId);
    if (isNaN(roomId)) {
      return res.status(400).json({ success: false, msg: "Invalid room ID" });
    }

    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({
      success: true,
      msg: "Messages retrieved successfully",
      messages,
    });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to retrieve messages",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Save chat message to database
async function saveMessage(messageData) {
  try {
    const { message, senderName, roomId, role } = messageData;

    await prisma.message.create({
      data: {
        message,
        senderName,
        roomId,
        role,
      },
    });

    return true;
  } catch (error) {
    console.error("Error saving message:", error);
    return false;
  }
}

// Handle client connection
wss.on("connection", function connection(ws) {
  console.log("New client connected");

  // Send connection confirmation
  ws.send(
    JSON.stringify({
      type: "connection",
      message: "Connected to WebSocket server",
      timestamp: new Date().toISOString(),
    })
  );

  // Setup ping interval to keep connection alive
  const pingInterval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.ping();
    }
  }, 30000);

  // Handle client messages
  ws.on("message", async function message(data) {
    try {
      const parsedData = JSON.parse(data.toString());
      console.log("Received message:", parsedData.type);

      switch (parsedData.type) {
        case "join":
          handleRoomJoin(ws, parsedData);
          break;

        case "chat":
          await handleChatMessage(ws, parsedData);
          break;

        default:
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Unknown message type",
            })
          );
      }
    } catch (error) {
      console.error("Error processing message:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Failed to process message",
        })
      );
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(pingInterval);

    // Remove client from all rooms
    chatRooms.forEach((room) => {
      room.member = room.member.filter((client) => client !== ws);
    });

    // Clean up empty rooms
    chatRooms = chatRooms.filter((room) => room.member.length > 0);
  });
});

// Handle room join requests
function handleRoomJoin(ws, data) {
  if (!data.roomId) {
    return ws.send(
      JSON.stringify({
        type: "error",
        message: "Room ID is required",
      })
    );
  }

  let room = chatRooms.find((room) => room.roomId === data.roomId);

  if (room) {
    // Check if client is already in this room
    const isExistingMember = room.member.includes(ws);

    if (isExistingMember) {
      return ws.send(
        JSON.stringify({
          type: "warning",
          message: "You are already in this room",
        })
      );
    }

    // Add client to existing room
    room.member.push(ws);
    ws.send(
      JSON.stringify({
        type: "success",
        message: "Joined the chat room",
      })
    );
  } else {
    // Create new room with client as first member
    chatRooms.push({ roomId: data.roomId, member: [ws] });
    ws.send(
      JSON.stringify({
        type: "success",
        message: "Created and joined new chat room",
      })
    );
  }
}

// Handle chat messages
async function handleChatMessage(ws, data) {
  if (!data.roomId || !data.message || !data.senderName) {
    return ws.send(
      JSON.stringify({
        type: "error",
        message: "Invalid message format",
      })
    );
  }

  const room = chatRooms.find((room) => room.roomId === data.roomId);

  if (!room) {
    return ws.send(
      JSON.stringify({
        type: "error",
        message: "Room not found, please join a room first",
      })
    );
  }

  // Save message to database
  const saved = await saveMessage(data);

  if (!saved) {
    return ws.send(
      JSON.stringify({
        type: "error",
        message: "Failed to save message",
      })
    );
  }

  // Broadcast message to all other clients in the room
  const messageWithTimestamp = {
    ...data,
    createdAt: new Date(),
  };

  room.member.forEach((client) => {
    if (client !== ws && client.readyState === client.OPEN) {
      client.send(
        JSON.stringify({
          type: "message",
          message: messageWithTimestamp,
        })
      );
    }
  });
}
