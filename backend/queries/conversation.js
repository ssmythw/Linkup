const Conversation = require("../models/conversation");

const createConversation = (name) => {
  return Conversation.create({ name: name });
};

const getAllConversations = () => {
  return Conversation.find({});
};

const addNewMember = (name, newMember) => {
  return Conversation.findOneAndUpdate(
    { name: name },
    { $push: { members: newMember } }
  );
};

module.exports = { createConversation, getAllConversations, addNewMember };
