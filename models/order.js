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
            quantity: Number,
        }
    ],
    client:{
        id: String,
        name: String,
        address: String,
    },
    state: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    estimatedDelivery: {
        type: Date
    }
});

OrderSchema.statics.addOrder = async function(order) {
    const newOrder = new this(order);
    return await newOrder.save();
}

module.exports = mongoose.model('Order', OrderSchema);