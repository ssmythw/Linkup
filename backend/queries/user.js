const User = require("../models/user");

const createUser = (username, email, hash, image) => {
  return User.create({ username, email, password: hash, image });
};

const getUserById = (id) => {
  return User.find({ _id: id });
};

module.exports = { createUser, getUserById };
