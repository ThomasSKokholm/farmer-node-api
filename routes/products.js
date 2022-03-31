const express = require('express');
const router = express.Router();
const {products, validate} = require('../models/products');

router.get("/", (req,res)=> {
    res.send(products);
});

router.get('/:id', (req, res) => {
    const product=products.find(g => g.id===parseInt(req.params.id));
    if(!product)
        return res
        .status(404)
        .send("Produktet findes ikke");
    res.send(product);
});

router.post('/', (req,res)=>{
    const {error} = validateProdukt(req.body);
    if(error) return res.status(400).send(error);

    const product = {
        id: products.length + 1,
        ...req.body
    };
    products.push(product);
    res.send(product);
});

router.put('/:id', (req,res)=> {
    const product = products.find(g=> g.id === parseInt(req.params.id));
    if(!product) return res.status(404).send("Produktet findes ikke");

    const {error} = validateProdukt(req.body);

    if(error) return res.status(400).send(error.details[0].message);

        product.cat = req.body.cat;
        product.name = req.body.name;
        product.desc = req.body.desc;
        product.img = req.body.img;
        product.unit = req.body.unit;
        product.price = req.body.price;
        product.amount = req.body.amount;
        res.send(product);
});

router.delete('/:id', (req,res)=> {
    const product=products.find(g=> g.id===parseInt(req.params.id));
    if(!product) return res.status(404).send("Produktet findes ikke");
    
    const index = products.indexOf(product);
    products.splice(index,1);

    res.send(product);
});

module.exports = router;