const { number } = require("joi");
const joi = require("joi");
const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    navn: { type: String, maxlength: 255, minlength: 2, required: true },
    adresse: String,
    by: String,
    tlf: String
});

const Farmer = mongoose.model("Farmers", farmerSchema);

function validateFarmer(farmer) {
    const schema = joi.object({
      navn: joi.string().min(3).required(),
      adresse: joi.string().min(3).required(),
      by: joi.string().min(4),
      tlf: joi.string().min(8)
    });
    return schema.validate(farmer);
}


exports.Farmer = Farmer;
exports.validate = validateFarmer;
