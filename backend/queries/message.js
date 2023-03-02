const Message = require("../models/message");

const getMessagesByConversation = (conversation) => {
  return Message.find({ conversation: conversation });
};

const createMessage = (username, message, conversation) => {
  return Message.create({
    username: username,
    message: message,
    conversation: conversation,
  });
};

module.exports = { getMessagesByConversation, createMessage };
