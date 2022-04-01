const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const products = require('../routes/products');
const product = require('../routes/product');
const farmer = require('../routes/farmer');
const user = require('../routes/user');


module.exports = function (app) {
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.get("/", (req,res)=>{res.send("Det virker!")});
    app.use("/api/products", products);
    app.use("/api/product", product);
    app.use("/api/farmer", farmer);
    app.use("/api/user", user);
};
