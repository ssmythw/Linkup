const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const messageRoutes = require("./routes/messageRoutes");
require("dotenv").config();
const message = require("./models/message");

const app = express();

const pusher = new Pusher({
  appId: "1559450",
  key: "8897d49bca636ec4a9cd",
  secret: "e3ca6428286171a10a3a",
  cluster: "us2",
  useTLS: true,
});

//db connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
  message.watch().on("change", (data) => {
    console.log("a change has occured");
    if (data.operationType === "insert") {
      const messageDetails = data.fullDocument;
      console.log(messageDetails);
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        receieved: messageDetails.received,
      });
    }
  });
});

//middleware
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//middleware routes
app.use("/messages", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
