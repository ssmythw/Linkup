const router = require("express").Router();

router.get("/", (req, res) => {});
router.post("/create", (req, res) => {
  console.log("here");
});

module.exports = router;
