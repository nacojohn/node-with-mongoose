const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./Genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        default: 0,
        type: Number,
        min: 0
    },
    dailyRentalRate: {
        default: 0,
        type: Number,
        min: 1
    }
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
      title: Joi.string().min(3).required(),
    //   genre: Joi.object({
    //     name: Joi.string().required()
    //   }).required(),
      genreId: Joi.string().hex().required(),
      numberInStock: Joi.number().min(1).required(),
      dailyRentalRate: Joi.number().min(1).required()
    };
  
    return Joi.validate(movie, schema);
}

module.exports = { Movie, validateMovie };