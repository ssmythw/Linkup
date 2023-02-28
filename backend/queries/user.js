const User = require("../models/user");

const createUser = (username, email, hash, image) => {
  return User.create({ username, email, password: hash, image });
};

module.exports = { createUser };
