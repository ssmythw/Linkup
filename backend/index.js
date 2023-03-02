const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
require("dotenv").config();
const message = require("./models/message");
const cookieParser = require("cookie-parser");

const app = express();

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

const pusher = new Pusher({
  appId: "1559450",
  key: "8897d49bca636ec4a9cd",
  secret: "e3ca6428286171a10a3a",
  cluster: "us2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
  message.watch().on("change", (data) => {
    if (data.operationType === "insert") {
      const messageDetails = data.fullDocument;
      console.log(messageDetails);
      pusher.trigger("messages", "inserted", {
        username: messageDetails.username,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
