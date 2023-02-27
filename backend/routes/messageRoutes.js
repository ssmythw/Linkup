const router = require("express").Router();
const Messages = require("../models/message");

router.post("/create", (req, res) => {
  const message = req.body;
  Messages.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(data);
    }
  });
});

router.get("/sync", (req, res) => {
  console.log("here");
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(data);
    }
  });
});

module.exports = router;
