// const { number } = require("Joi");
const joi = require("joi");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  cat: String,
  title: { type: String, maxlength: 255, minlength: 2, required: true },
  descr: String,
  img: String,
  amount: { type: Number, min: 0, required: true },
  unit: String,
  price: { type: Number, min: 0, required: true },
  farmer: {type: mongoose.Types.ObjectId, required: true}
});

const Product = mongoose.model("Products", productSchema);

function validateProduct(prod) {
  const schema = joi.object({
    cat: joi.string().min(3).required(),
    title: joi.string().min(3).required(),
    img: joi.string().min(5),
    descr: joi.string().max(255),
    amount: joi.number().integer().min(0).required(),
    unit: joi.string().required(),
    price: joi.number().required(),
    farmer: joi.string().required()
  });

  return schema.validate(prod);
}

exports.Product = Product;
exports.validate = validateProduct;
