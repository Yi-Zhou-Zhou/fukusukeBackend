const express = require('express')
const router = express.Router();
const User = require('../models/user')
const emailExistence = require('email-existence');

const validateEmail = async (email) => {
    let res = await emailExistence.check(email, function (err, res) {
        if (res) {
            return true
        }
        else {
            return false
        }
    });
}

router.post('/register', async (req, res) => {  
    try {
        const { email, password, name } = req.body
        const emailValid = await validateEmail(email)
        if(!emailValid) {
            return res.status(400).json({
                message: 'Invalid email'
            })
        }
        const user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        // const newUser = new User({
        //     email,
        //     password,
        //     name
        // })
        // const savedUser = await newUser.save()
        // return res.status(201).json({
        //     message: 'User created',
        //     user: savedUser
        // })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.login(email, password)
        return res.status(200).send({
            user
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