const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: ["*"],
  },
});
//middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
//middleware routes
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);
app.use("/conversations", conversationRoutes);

//db connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("call ended");
  });
  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });
  socket.on("answercall", (data) => [
    io.to(data.to).emit("callaccepted", data.signal),
  ]);
  socket.on("send-message", (message) => {
    socket.broadcast.emit("received-message", message);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
