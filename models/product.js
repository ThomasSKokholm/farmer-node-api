// const { number } = require("Joi");
const Joi = require("Joi");
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
  const schema = Joi.object({
    cat: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    img: Joi.string().min(5),
    descr: Joi.string().max(255),
    amount: Joi.number().integer().min(0).required(),
    unit: Joi.string().required(),
    price: Joi.number().required(),
    farmer: Joi.string().required()
  });

  return schema.validate(prod);
}

exports.Product = Product;
exports.validate = validateProduct;
