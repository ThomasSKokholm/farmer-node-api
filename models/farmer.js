const { number } = require("Joi");
const Joi = require("Joi");
const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
    navn: { type: String, maxlength: 255, minlength: 2, required: true },
    adresse: String,
    by: String,
    tlf: String
});

const Farmer = mongoose.model("Farmers", farmerSchema);

function validateFarmer(farmer) {
    const schema = Joi.object({
      navn: Joi.string().min(3).required(),
      adresse: Joi.string().min(3).required(),
      by: Joi.string().min(4),
      tlf: Joi.string().min(8)
    });
    return schema.validate(farmer);
}


exports.Farmer = Farmer;
exports.validate = validateFarmer;
