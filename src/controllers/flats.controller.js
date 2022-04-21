const express = require("express");
const router = express.Router();
const Flats = require("../models/flats.model");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const items = await Flats.find().lean().exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.get("/all", async (req, res) => {
  try {
    const skip = Number(req.query.page) - 1 * Number(req.query.limit);

    const items = await Flats.find()
      .skip(skip)
      .limit(req.query.limit)
      .lean()
      .exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.get("/type", async (req, res) => {
  try {
    const items = await Flats.find({ type: req.query.type }).lean().exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.get("/1/:id", async (req, res) => {
  try {
    const items = await Flats.findById(req.params.id).lean().exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.patch("/edit/add/:id", async (req, res) => {
  try {
    const temp = await Flats.findById(req.params.id).lean().exec();
    temp.residents = String(Number(temp.residents) + 1);
    console.log(temp);
    const items = await Flats.findByIdAndUpdate(req.params.id, temp)
      .lean()
      .exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.patch("/edit/delete/:id", async (req, res) => {
  try {
    const temp = await Flats.findById(req.params.id).lean().exec();
    temp.residents = String(Number(temp.residents) - 1);
    console.log(temp);
    const items = await Flats.findByIdAndUpdate(req.params.id, temp)
      .lean()
      .exec();

    return res.status(200).send(items);
  } catch (er) {
    return res.status(500).send("ERROR : " + er);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const items = await Flats.findByIdAndDelete(req.params.id);

    return res.status(200).send(items);
  } catch (er) {
    return res.status(504).send("ERROR : " + er);
  }
});

router.post(
  "/add",
  body("type").notEmpty(),
  body("block").notEmpty(),
  body("number").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ data: errors.array() });
    }
    try {
      let temp = req.body;
      temp.residents = "0";
      const items = await Flats.create(temp);

      return res.status(200).send(items);
    } catch (er) {
      return res.status(500).send("ERROR : " + er);
    }
  }
);

module.exports = router;
