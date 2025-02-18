

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image : String,
    title : String,
    description : String,
    category : String,
    brand : String,
    prize : Number,
    salePrize : Number,
    totalStock : Number
}, { timestamps : true })

module.exports = mongoose.model('product', ProductSchema );