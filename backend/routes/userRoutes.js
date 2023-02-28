const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/create", (req, res) => {
  console.log("here");
  const { username, email, password, image } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  User.create({ username, email, password: hash, image })
    .then((response) => {
      console.log(response);
      res.cookie("user_id", response._id.valueOf());
      res.json(response);
    })
    .catch((err) => {
      throw new Error("Username or email already exists.");
    });
});

module.exports = router;
