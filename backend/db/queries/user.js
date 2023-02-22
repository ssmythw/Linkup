const db = require("../connection");

const createUser = (username, email, password, image) => {
  return db.query(
    "INSERT INTO users(username, email, password, image) VALUES($1, $2, $3, $4)",
    [username, email, password, image]
  );
};

const findByUsername = (username) => {
  return db.query("SELECT * FROM users WHERE username=$1", [username]);
};

module.exports = { createUser, findByUsername };
