const User = require("../models/user");

const createUser = (username, email, hash, image) => {
  return User.create({ username, email, password: hash, image });
};

const getUserById = (id) => {
  return User.find({ _id: id });
};

const getUserByUsername = (username) => {
  return User.find({ username: username });
};

const addConversation = (id, converation) => {
  return User.findOneAndUpdate(
    { _id: id },
    { $push: { conversations: converation } },
    { returnOriginal: false }
  );
};

const deleteConversation = (id, conversation) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { $pull: { conversations: conversation } },
    { new: true }
  );
};

const getConversations = (id) => {
  return User.find({ _id: id }).select("conversations");
};

module.exports = {
  createUser,
  getUserById,
  addConversation,
  getConversations,
  getUserByUsername,
  deleteConversation,
};
