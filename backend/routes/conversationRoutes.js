const router = require("express").Router();
const {
  createConversation,
  getAllConversations,
} = require("../queries/conversation");

router.get("/", (req, res) => [
  getAllConversations()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    }),
]);

router.post("/create", (req, res) => {
  const { name } = req.body;
  createConversation(name).then((response) => {
    if (response !== null) {
      res.status(201).json(response);
    } else {
      res.status(200).json({ message: "Conversation already exists." });
    }
  });
});

module.exports = router;
