const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }]
});


UserSchema.statics.login = async function (email,password){
    const user = await this.findOne({email})
    return new Promise ((resolve, reject) => {
        if (user) {
            if (password === user.password){
                resolve(user)
            }
            reject('Incorrect password')
        }
        reject('Incorrect email')
    })
    
}
const User = mongoose.model('User', UserSchema);
module.exports = User;