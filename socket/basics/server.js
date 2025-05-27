const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
  console.log("User connected");

  // Store username on socket
  socket.on("joined", (userName) => {
    socket.userName = userName; // ✅ Save to socket
    users.add(userName);

    io.emit("Userjoined", userName);
    io.emit("userList", Array.from(users));
  });

  // Handle incoming message
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    if (socket.userName) {
      users.delete(socket.userName);
      io.emit("userLeft", socket.userName);
      io.emit("userList", Array.from(users));
    }
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); // ✅ Correct path
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
