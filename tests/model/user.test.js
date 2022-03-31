const {User} = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
// const req = require('express/lib/request');

test('user.generateAuthToken - burde returner en gyldig token', () => {
    const id = new mongoose.Types.ObjectId();
    const user = new User({_id: id});
    console.log(user);
    const token = user.generateAuthToken();
    console.log(token);
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    expect(decoded).toMatchObject({_id: id});
});
