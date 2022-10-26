const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        length: 11
    },
    isGold: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone: Joi.string().length(11).required(),
      is_gold: Joi.boolean().required()
    };
  
    return Joi.validate(customer, schema);
}
  

module.exports = { Customer, validateCustomer };