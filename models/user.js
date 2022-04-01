const config = require("config");
const bcrypt = require('bcrypt');
const lodash = require('lodash');
const joi = require("joi");
const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type:String, maxlength: 255, 
        minlength: 6, unique:true, required: true},
    password: {type:String, required: true},
    isAdmin: Boolean
});

//enum: ["admin", "seller", "clint"]

//schema func
//userSchema.methods.comparePassword = function(pwd, )
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id: this._id,
        access: this.isAdmin
    },
            config.get("jwtPrivateKey")
    );
    return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(usr){
    const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().required().email().min(6).max(255),
        password: joi.string().required(),
        isAdmin: joi.boolean().required()// <- enum?
    });
    return schema.validate(usr);
}

exports.User = User;
exports.validate = validateUser;
