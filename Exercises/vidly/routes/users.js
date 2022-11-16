const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();

const hash = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
  
router.post('/users', async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message
    });

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('Email already in use.');

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: await hash(req.body.password),
        });

        await user.save();

        const data = _.pick(user, ['name', 'email']);
        
        res.send(data);
    } catch (err) {
        console.log(err)
        res.status(500).send('request failed');
    }
});
  
module.exports = router;