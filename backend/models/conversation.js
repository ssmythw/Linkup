const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Conversation", conversationSchema);
