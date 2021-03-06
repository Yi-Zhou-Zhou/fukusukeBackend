const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    role: {type: String, required: true},
    run: {type: String, required: false},
    address: {type: String, required: false},
    birthday: {type: Date, required: false},
    phone: {type: String, required: false},
    region: {type: String, required: false},
    province: {type: String, required: false},
    commune: {type: String, required: false},
    sex: {type: String, required: false},

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.statics.validateJWT = async function (token){
    const decoded = jwt.verify(token, "CHANGE_THIS_TOKEN_SECRET");
}


UserSchema.statics.login = async function (email,password){
    const user = await this.findOne({email})
    return new Promise ((resolve, reject) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                // make jwt
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    address: user.address,
                }, "CHANGE_THIS_TOKEN_SECRET");
                resolve(token);
            }
            reject('La contraseña es incorrecta')
        }
        reject('El correo electrónico es incorrecto')
    })
}

UserSchema.statics.createUser = async function ({email, password, name, run, address, birthday, phone, region, province, commune, sex, role}){
    const user = await this.findOne({email})
    return new Promise ((resolve, reject) => {
        if (user) {
            reject('El correo electrónico ya está en uso')
            return;
        }
        const newUser = new this({
            email,
            password,
            name,   
            run,
            address,
            birthday,
            phone,
            region,
            province,
            commune,
            sex,
            role
        })
        newUser.save()
        resolve(newUser)
    })
}


const User = mongoose.model('User', UserSchema);
module.exports = User;