const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  name: String,
  members: Array,
});

module.exports = mongoose.model("Conversation", conversationSchema);
