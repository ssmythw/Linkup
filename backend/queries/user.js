const User = require("../models/user");

const createUser = (username, email, hash, image) => {
  return User.create({ username, email, password: hash, image });
};

const getUserById = (id) => {
  return User.find({ _id: id });
};

const addConversation = (id, converation) => {
  return User.findOneAndUpdate(
    { _id: id },
    { $push: { conversations: converation } },
    { returnOriginal: false }
  );
};

const getConversations = (id) => {
  return User.find({ _id: id }).select("conversations");
};

module.exports = { createUser, getUserById, addConversation, getConversations };
