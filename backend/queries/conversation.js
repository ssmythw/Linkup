import Conversation from "../models/conversation";

const createConversation = (name, newMember) => {
  Conversation.create({ name: name }, { $push: { members: newMember } });
};
