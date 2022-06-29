const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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


UserSchema.statics.login = async function (email,password){
    const user = await this.findOne({email})
    return new Promise ((resolve, reject) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                resolve(user)
            }
            reject('Incorrect password')
        }
        reject('Incorrect email')
    })
}

UserSchema.statics.createUser = async function ({email, password, name, run, address, birthday, phone, region, province, commune, sex, role}){
    const user = await this.findOne({email})
    return new Promise ((resolve, reject) => {
        if (user) {
            reject('User already exists')
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