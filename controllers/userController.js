const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = newUser({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.send({ token: token });
  } catch (err) {
    res.status(422).send(err.message);
  }
});

router.post("signin", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Provide a Valid username and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(422)
      .send({
        error: "email not found, do you need to sign up for an account?",
      });
  }
  try {
      await user.comparePassword(password)
      const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY)
      res.send(token)
  } catch (err) {
    return res.status(422).send({ error: "Invalid username and password" });
  }
});

module.exports = router
