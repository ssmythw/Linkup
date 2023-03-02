const Message = require("../models/message");

const getMessagesByConversation = (conversation) => {
  return Message.find({ conversation: conversation });
};

const createMessage = async (username, message, conversation) => {
  await Message.create({
    username: username,
    message: message,
    conversation: conversation,
  });
};

module.exports = { getMessagesByConversation, createMessage };
