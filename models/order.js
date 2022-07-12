const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    price: Number,
    productos: [
        {
            id: String,
            name: String,
            price: Number,
            description: String,
            picture: String,
        }
    ],
    client:{
        name: String,
        address: String,
        phone: String,
     },

    createdAt: {
        type: Date,
        default: Date.now
    },
    estimatedDelivery: {
        type: Date
    }
});

module.exports = mongoose.model('Order', OrderSchema);