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
  getAllUsers,
  addFriend,
  getFriends,
  hasFriend,
} = require("../queries/user");

router.get("/", (req, res) => {
  getAllUsers().then((response) => {
    res.status(200).json(response);
  });
});

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
  res.status(200).json({ message: "Cookie has been deleted." });
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

router.post("/friend/add", async (req, res) => {
  const { id, recipient } = req.body;
  const arr = await getUserById(id);
  const user = arr[0];
  const friend = await hasFriend(user, recipient);
  console.log(friend);
  if (friend.length === 0) {
    addFriend(user, recipient).then((response) => {
      res.status(200).send(response);
    });
  } else {
    res.status(500).json({ error: "User already has this friend." });
  }
});

router.get("/friends/:id", (req, res) => {
  const id = req.params.id;
  getFriends(id).then((response) => {
    res.status(200).json(response[0]);
  });
});

module.exports = router;
