const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  username: String,
  message: String,
  conversation: String,
  senderUsername: String,
  receiverUsername: String,
  timestamp: String,
});

module.exports = mongoose.model("Message", messageSchema);
