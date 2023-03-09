const User = require("../models/user");

const getAllUsers = () => {
  return User.find({});
};

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

const addFriend = async (user, recipient) => {
  console.log(user);
  console.log(recipient);
  const update1 = await User.findOneAndUpdate(
    { username: recipient.username },
    { $addToSet: { friends: user } }
  );
  const update2 = await User.findOneAndUpdate(
    { username: user.username },
    { $addToSet: { friends: recipient } }
  );

  return update2;
};

const getFriends = (id) => {
  return User.find({ _id: id }).select("friends");
};

const hasFriend = (user, recipient) => {
  return User.find(
    { username: user.username },
    { friends: recipient.username }
  );
};

module.exports = {
  createUser,
  getUserById,
  addConversation,
  getConversations,
  getUserByUsername,
  deleteConversation,
  getAllUsers,
  addFriend,
  getFriends,
  hasFriend,
};
