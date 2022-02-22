const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product_schema = new Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },
    
    image:{
        type: String,
        required: true,
    },
});

const products = mongoose.model("products", product_schema);
module.exports = products;