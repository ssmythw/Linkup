const router = require("express").Router();
const {
  getMessagesByConversation,
  createMessage,
} = require("../queries/message");

router.post("/", (req, res) => {
  const { conversation } = req.body;
  getMessagesByConversation(conversation).then((messages) => {
    res.status(200).json(messages);
  });
});

router.post("/create", (req, res) => {
  const { username, message, conversation, timestamp } = req.body;
  createMessage(username, message, conversation, timestamp).then((message) => {
    res.status(201).json(message);
  });
});

router.post("/sync", async (req, res) => {
  const conversation = req.body.conversation;
  const messages = await getMessagesByConversation(conversation);
  res.status(200).json(messages);
});

module.exports = router;
