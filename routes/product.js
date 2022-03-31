const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { Product, validate } = require("../models/product");
const auth = require('../middleware/auth');
const validateObjectID =require("../middleware/validateObjectId");
const debug = require("debug")("app:http");

router.get("/", async (req, res) => {
  res.send(await Product.find().sort("title"));
});

router.get("/:id", validateObjectID,async (req, res) => {
  const prod = await Product.findById(req.params.id); //products.find((p) => p.id === parseInt(req.params.id));
  if (!prod) return res.status(404).send(`Produktet findes ikke`);

  res.send(prod);
});

router.post("/", [auth,validateObjectID], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const prod = new Product({ ...req.body });

  try {
    await prod.save();
    res.send(prod);
  } catch (err) {
    debug(err.message);
  }
});

router.put("/:id", [auth,validateObjectID], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if(!mongoose.Types.ObjectId.isValid(req.body.farmer))
    return res.status(404).send("Farmeren findes ikke");

  try {
    const prod = await Product.findByIdAndUpdate(
      req.params.id,
      {
        cat: req.body.cat,
        title: req.body.title,
        pic: req.body.pic,
        descr: req.body.descr,
        amount: req.body.amount,
        unit: req.body.unit,
        price: req.body.price,
        farmer: req.body.farmer
      },
      { new: true }
    );

    if (!prod) return res.status(404).send("Produktet eksisterer ikke");

    res.send(prod);
  } catch (err) {
    debug(err.message);
  }
});

router.delete("/:id", [auth,validateObjectID], async (req, res) => {
  const prod = await Product.findByIdAndDelete(req.params.id);
  if (!prod) return res.status(404).send("Produktet findes ikke");

  res.send(prod);
});

module.exports = router;
