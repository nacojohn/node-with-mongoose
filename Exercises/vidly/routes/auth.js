const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models/user');
const router = express.Router();

const hash = async (password) => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
  
router.post('/', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).send('Invalid login details');

        // compare password
        if (!(await bcrypt.compare(password, user.password))) return res.status(401).send('Invalid login details');
        
        res.send(_.pick(user, ['name', 'email']));
    } catch (err) {
        console.log(err)
        res.status(500).send('request failed');
    }
});
  
module.exports = router;