const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.route('/').post(async (req,res) => {
    
    const action = req.body.action;
    if (action == "register"){
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const role = req.body.role;
        const newuser = new User({
        email, password, name, role
        })

        newuser.save()
    }

    else if (action == "login") {
        try {
            const email = req.body.email
            const password = req.body.password
            const user = await User.login(email,password)
            return res.status(200).send({
                user
            })

        }
        catch(error){
            
            return res.status(400).send({
                ok: false,
                err: {
                    message: error
                }
            })
        }
    }

})
module.exports = router;