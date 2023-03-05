const Message = require("../models/message");

const getMessagesByConversation = (conversation) => {
  return Message.find({ conversation: conversation });
};

const createMessage = (username, message, conversation, timestamp) => {
  return Message.create({
    username: username,
    message: message,
    conversation: conversation,
    timestamp: timestamp,
  });
};

module.exports = { getMessagesByConversation, createMessage };
