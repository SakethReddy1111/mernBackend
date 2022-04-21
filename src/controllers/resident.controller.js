const express = require("express");
const router = express.Router();
const Resident = require("../models/resident.model");
const { body, validationResult } = require("express-validator");
const Flats = require("../models/flats.model");

router.get("/", async (req, res) => {
  try {
    const items = await Resident.find().lean().exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const items = await Resident.find({ flat: req.params.id }).lean().exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const items = await Resident.findByIdAndDelete(req.params.id);

    return res.status(200).send(items);
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

router.post(
  "/add",
  body("flat").notEmpty(),
  body("age").notEmpty(),
  body("gender").notEmpty(),
  body("name").notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ data: errors.array() });
    }
    try {
      const items = await Resident.create(req.body);

      return res.status(200).send(items);
    } catch (er) {
      return res.status(500).send("ERROR : " + er);
    }
  }
);

module.exports = router;
