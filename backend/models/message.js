const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  id: String,
  message: String,
  conversation: String,
  timestamp: String,
});

module.exports = mongoose.model("Message", messageSchema);
