const { number } = require("Joi");
const Joi = require('joi');
const mongoose = require('mongoose');
// Objekt typen Product
// Katetegori,Title,Beskrivelse,Sti til billede,Antal,Enhed,Pris;
class Product{
    constructor(id, cat, name,desc,img,amount,unit,price){
        this.id = id;
        this.cat = cat;
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.amount = amount;
        this.unit = unit;
        this.price = price;
    }
}
let products = new Array(
    new Product(1, "grøntsager", "Kartofler", "2 kg Linzer kartofler", "kartofler.jpg", "2", "kg", "20"),
    new Product(2, "grøntsager", "Ærter", "500 g ærter fra egen avl", "aerter.jpg", "500", "gram", "25"),
    new Product(3, "frugt", "Jordbær", "Dagfriske jordbær fra egen mark", "jordbaer.jpg", "500", "gram", "30"),
    new Product(4, "grøntsager", "Gulerødder", "I tre forskellige farver", "guleroedder.jpg", "1", "kg", "20")
);

function validateProdukt(product){
    const schema = Joi.object({name: Joi.string()
    .min(5)
    .max(50)
    .required()});
    return schema.validate(product);
}

var product1 = ["grøntsager", "Kartofler", "2 kg Linzer kartofler", "kartofler.jpg", "2", "kg", "20"];
var product2 = ["grøntsager", "Ærter", "500 g ærter fra egen avl", "aerter.jpg", "500", "gram", "25"];
var product3 = ["frugt", "Jordbær", "Dagfriske jordbær fra egen mark", "jordbaer.jpg", "500", "gram", "30"];
var product4 = ["grøntsager", "Gulerødder", "I tre forskellige farver", "guleroedder.jpg", "1", "kg", "20"];

console.table(product1);

exports.products = products;
exports.validate = validateProdukt;
