const express = require("express");
const router = express.Router();
const User = require("../models/users.module");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const newToken = (item) => {
  return jwt.sign({ item }, "ThisIsSakethReddy1111");
};

router.get("/", async (req, res) => {
  try {
    const items = await User.find().lean().exec();

    return res.send(items);
  } catch (e) {
    return res.send("ERROR : " + e);
  }
});

router.post(
  "/register",
  // body("email")
  //   .isEmail()
  //   .custom(async (value) => {
  //     //const item = await User.findOne({ email: value });
  //     if (item) {
  //       throw new Error("Email already in use");
  //     }
  //     return true;
  //   }),
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("mobile").isNumeric().isLength(10),
  body("password").isStrongPassword(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }
    try {
      const item = await User.create(req.body);

      const token = newToken(item);

      // console.log({ item, token });
      return res.status(201).send({ item, token });
    } catch (e) {
      return res.status(400).send("ERROR : " + e);
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const items = await User.findByIdAndDelete(req.params.id);

    return res.send(items);
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

router.post("/login", async (req, res) => {
  try {
    const item = await User.findOne({ email: req.body.email });

    if (!item) {
      return res.status(400).send({ message: "Invalid username or password" });
    }
    const match = item.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const token = newToken(item);
    return res.status(200).send({ token });
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

module.exports = router;
