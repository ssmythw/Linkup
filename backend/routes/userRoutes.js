const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createUser, getUserById } = require("../queries/user");

router.post("/create", (req, res) => {
  const { username, email, password, image } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  createUser(username, email, hash, image)
    .then((response) => {
      res.cookie("user_id", response._id.valueOf());
      res.status(201).json(response);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ status: 500, error: "Username or email already exists" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  getUserById(id).then((user) => {
    res.status(200).json(user[0]);
  });
});

module.exports = router;
