const mongoose = require('mongoose')
const {Schema, model} = mongoose
const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    catergory: String,
    dateOfSale: Date,
    sold: Boolean,
})
const Product = model('Product', productSchema)
module.exports = Product