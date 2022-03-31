const express = require("express");
const router = express.Router();

const config = require('config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, validate } = require("../models/user");
const debug = require("debug")("app:http");

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send("Brugeren findes allrede!");

    user = new User({ ...req.body });

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const token = jwt.sign(
            { _id: user._id, access: user.isAdmin },
            config.get("jwtPrivateKey")
        );
        await user.save();

        res.header("x-auth-token", token)
            .send({ name: user.name, email: user.email });
    } catch (error) {
        debug(error.message);
    }
});

module.exports = router;