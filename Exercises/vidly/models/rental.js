const mongoose = require('mongoose');
const moment = require('moment');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    quantity: {
        default: 0,
        type: Number,
        min: 1,
        required: true
    },
    numberOfDays: {
        default: 0,
        type: Number,
        min: 1,
        required: true
    },
    dateOfRental: {
        type: Date,
        default: moment().startOf('day')
    },
    dateOfReturn: {
        type: Date
    }
}, { timestamps: true });

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
      customerId: Joi.ObjectId().required(),
      movieId: Joi.ObjectId().required(),
      quantity: Joi.number().min(1).required(),
      numberOfDays: Joi.number().min(1).required()
    };
  
    return Joi.validate(rental, schema);
}

module.exports = { Rental, validateRental };