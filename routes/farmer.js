const express = require("express");
const router = express.Router();
// const { Product, validate } = require("../models/product");
// const {products, validate} = require('../models/products');
const { Farmer, validate } = require("../models/farmer");
const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const debug = require("debug")("app:http");

router.get("/", async (req, res) => {
    res.send(await Farmer.find().sort("navn"));
});

router.get("/:id", validateObjectId, async (req, res) => {
    const farmer = await Farmer.findById(req.params.id); //products.find((p) => p.id === parseInt(req.params.id));
    if (!farmer) return res.status(404).send(`Farmeren findes ikke`);

    res.send(farmer);
});

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const farmer = new Farmer({ ...req.body });

    try {
        await farmer.save();
        res.send(farmer);
    } catch (err) {
        debug(err.message);
    }
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const farmer = await Farmer.findByIdAndUpdate(
            req.params.id,
            {
                navn: req.body.navn,
                adresse: req.body.adresse,
                by: req.body.by,
                tlf: req.body.tlf
            },
            { new: true }
        );

        if (!farmer) return res.status(404).send("Farmeren eksisterer ikke");

        res.send(farmer);
    } catch (err) {
        debug(err.message);
    }
});

router.delete("/:id", [auth, validateObjectId], async (req, res) => {
    const farmer = await Farmer.findByIdAndDelete(req.params.id);
    if (!farmer) return res.status(404).send("Farmeren findes ikke");

    res.send(farmer);
});

module.exports = router;
