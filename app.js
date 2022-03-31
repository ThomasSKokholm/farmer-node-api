const express = require('express');
const config = require('config');
// dotenv
var mongoose = require('mongoose');
config.get("db");
// const products = require('./routes/products');
// const Joi = require('joi');
// const app = require('express')();
const app = express();
const error = require("./middleware/error");
// const validateObjectID =require("./middleware/validateObjectId");
const debug = require('debug')('app:startup');

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

// require('./routes/products')(app);
app.use(express.json());
require("./startup/routes")(app);
// app.use('/api/products', products);

// app.use(validateObjectID);
app.use(error);
const port = process.env.PORT || 3000;
app.listen(port, ()=>debug(`Lytter på port http://localhost:${port}`));

// app.get('/', (req,res) => {
//     res.send('Hej verden🌎');
// });

// class Product{
//     constructor(id, cat, name,desc,img,amount,unit,price){
//         this.id = id;
//         this.cat = cat;
//         this.name = name;
//         this.desc = desc;
//         this.img = img;
//         this.amount = amount;
//         this.unit = unit;
//         this.price = price;
//     }
// }
// let products = new Array(
//     new Product(1, "grøntsager", "Kartofler, 2 kg Linzer kartofler", "kartofler.jpg", "2", "kg", "20"),
//     new Product(2, "grøntsager", "Ærter, 500 g ærter fra egen avl", "aerter.jpg", "500", "gram", "25"),
//     new Product(3, "frugt", "Jordbær, Dagfriske jordbær fra egen mark", "jordbaer.jpg", "500", "gram", "30"),
//     new Product(4, "grøntsager", "Gulerødder, I tre forskellige farver", "guleroedder.jpg", "1", "kg", "20")
// );

// app.get('/api/products/:id', (req, res) => {
//     const product=products.find(g => g.id===parseInt(req.params.id));
//     if(!product) return res.status(404).send("Produktet findes ikke");
//     res.send(product);
// });

// app.get('/api/products/', (req, res) => {
//     // const product=products.find(g => g.id===parseInt(req.params.id));
//     // if(!product) return res.status(404).send("Produktet findes ikke");
//     res.send(products);
// });

// app.post('/api/products/', (req,res)=>{
//     const {error} = validateProdukt(req.body);
//     if(error) return res.status(400).send(error);

//     const product = {
//         id: products.length + 1,
//         name: req.body.name
//     };
//     products.push(product);
//     res.send(product);
// });

// app.put('/api/products/:id', (req,res)=> {
//     const product = products.find(g=> g.id === parseInt(req.params.id));
//     if(!product) return res.status(404).send("Produktet findes ikke");

//     const {error} = validateProdukt(req.body);

//     if(error) return res.status(400).send(error.details[0].message);

//         product.name = req.body.name;
//         res.send(product);
// });

// app.delete('/api/products/:id', (req,res)=> {
//     const product=products.find(g=> g.id===parseInt(req.params.id));
//     if(!product) return res.status(404).send("Produktet findes ikke");
    
//     const index = products.indexOf(product);
//     products.splice(index,1);

//     res.send(product);
// });

// function validateProdukt(product){
//     const schema = Joi.object({name: Joi.string()
//     .min(5)
//     .max(50)
//     .required()});
//     return schema.validate(product);
// }