const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUserById,
  addConversation,
  getConversations,
  getUserByUsername,
  deleteConversation,
} = require("../queries/user");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  getUserByUsername(username)
    .then((response) => {
      if (response.length === 0) {
        res
          .status(500)
          .json({ status: 500, error: "Username does not exist." });
      }
      bcrypt.compare(password, response[0].password).then((pwCheck) => {
        if (!pwCheck) {
          res
            .status(500)
            .json({ status: 500, error: "Password is incorrect." });
        } else {
          res.cookie("user_id", response[0]._id.valueOf());
          res.status(200).json(response);
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.end();
});

router.post("/create", (req, res) => {
  const { username, email, password, image } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  createUser(username, email, hash, image)
    .then((response) => {
      console.log(response);
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

router.post("/create/conversation", (req, res) => {
  const { id, conversation } = req.body;
  addConversation(id, conversation).then((user) => {
    res.status(200).json(user);
  });
});

router.delete("/delete/conversation", (req, res) => {
  const { id, conversation } = req.body;
  deleteConversation(id, conversation).then((user) => {
    res.status(200).json(user);
  });
});

router.get("/conversations/:id", (req, res) => {
  const id = req.params.id;
  getConversations(id).then((convos) => {
    res.status(200).json(convos[0].conversations);
  });
});

module.exports = router;
