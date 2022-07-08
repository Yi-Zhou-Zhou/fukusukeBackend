const express = require('express')
const router = express.Router();
const User = require('../models/user')
const emailExistence = require('email-existence');
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

const validateEmail = async (email) => {
    return new Promise((resolve, reject) => {
        emailExistence.check(email, function (error, response) {
            if (error) {
                reject(error)
            } else {
                resolve(response)
            }
        });
    })
}

router.get('/', auth, async (req, res) => {
    try {
        if (req.userData.role !== "admin")
            return res.status(401).send("Access denied.")
        const users = await User.find().select({
            _id: 1,
            name: 1,
            email: 1,
            role: 1,
            run: 1,
            phone: 1,
            // address: 1,
            // birthday: 1,
            // region: 1,
            // province: 1,
            // commune: 1,
            // sex: 1,
            // createdAt: 1,
            // updatedAt: 1
        });
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.post('/register', async (req, res) => {  
    try {
        const { email, password, name, run, address, birthday, phone, region, province, commune, sex, role } = req.body
        const emailValid = await validateEmail(email);
        if(!emailValid) {
            return res.status(400).json({
                message: 'El correo electrónico no es válido'
            })
        }
        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // create the user
        const birthdayDate = new Date(birthday);
        await User.createUser({
            email,
            password: hashedPassword,
            name,
            run,
            address,
            birthday: birthdayDate,
            phone,
            region,
            province,
            commune,
            sex,
            role,
        }).then(user => {
            return res.status(201).json({
                message: 'User created',
                user
            })
        }
        ).catch(err => {
            return res.status(400).json({
                message: err,
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const token = await User.login(email, password)
        return res.status(200).send({
            token
        })
    } catch (error) {
        return res.status(400).send({
            ok: false,
            err: {
                message: error
            }
        })
    }
});

module.exports = router;