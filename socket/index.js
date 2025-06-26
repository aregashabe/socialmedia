const io = require("socket.io")(8800, {
  cors: {
    origin: "http://localhost:5173",  // your frontend URL
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add user when they connect
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    console.log("Active users:", activeUsers);
    io.emit("get-users", activeUsers);
  });

  // Remove user on disconnect
  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected:", socket.id);
    io.emit("get-users", activeUsers);
  });

  // Listen for messages
  socket.on("send-message", (data) => {
    // data: { senderId, receiverId, text }
    const user = activeUsers.find((user) => user.userId === data.receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data);
      console.log(`Message sent to ${data.receiverId}:`, data.text);
    }
  });
});
