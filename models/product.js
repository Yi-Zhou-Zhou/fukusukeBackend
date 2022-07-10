const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    description: String,
    picture: String,
    category: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.statics.addProduct = async function(product) {
    const newProduct = new this(product);
    return await newProduct.save();
}
    

module.exports = mongoose.model('Product', ProductSchema);