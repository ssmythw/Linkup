const router = require("express").Router();
const Message = require("../models/message");

router.post("/create", (req, res) => {
  const message = req.body;
  Message.create(message, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(data);
    }
  });
});

router.get("/sync", (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(data);
    }
  });
});

module.exports = router;
