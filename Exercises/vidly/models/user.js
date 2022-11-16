const mongoose = require('mongoose');
const moment = require('moment');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(1).required()
    };
  
    return Joi.validate(user, schema);
}

module.exports = { User, validateUser };