const router = require("express").Router();
const {
  getMessagesByConversation,
  createMessage,
} = require("../queries/message");

router.post("/create", (req, res) => {
  const { username, message, conversation, timestamp } = req.body;
  createMessage(username, message, conversation, timestamp);
});

router.post("/sync", async (req, res) => {
  const conversation = req.body.conversation;
  const messages = await getMessagesByConversation(conversation);
  res.status(200).json(messages);
});

module.exports = router;
