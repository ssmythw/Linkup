const { createUser, findByUsername } = require("../db/queries/user");
const bcrypt = require("bcrypt");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    console.log(req.body);
    const hash = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hash, image);
    user = user.rows[0];
    delete user.password;
    res.status(201).json(user);
  } catch (err) {
    let msg;
    if (err.code === "23505") {
      msg = "User already exists";
    } else {
      msg = err.message;
    }
    res.status(400).json(msg);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let user = await findByUsername(username);
    if (user.rows.length === 0) {
      throw new Error("User does not exist");
    }
    user = user.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
