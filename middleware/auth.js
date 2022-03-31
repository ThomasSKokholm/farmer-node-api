
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const config = require('config');
// const { User, validate } = require("../models/user");
// const express = require("express");

module.exports = function (req, res, next){
    const token = req.header("x-auth-token");
    if(!token)
    return res.status(401).send("Adgang nængtet! Ikke logget på.");

    try {
        // console.log(token);
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
        req.user = decoded;
        // console.log(decoded);
        next();
    } catch (error) {
        res.status(400).send("Ugyldig token"+ error.message);
        // debug(error.message);
    }
};