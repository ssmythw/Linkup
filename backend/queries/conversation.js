import Conversation from "../models/conversation";

const createConversation = (name, newMember) => {
  return Conversation.create({ name: name }, { $push: { members: newMember } });
};

const getAllConversations = () => {
  return Conversation.find({});
};
