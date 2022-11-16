const express = require('express');
const moment = require('moment');
const Fawn = require('fawn');
const { Customer } = require('../models/Customer');
const { Movie } = require('../models/movie');
const { Rental, validateRental } = require('../models/rental');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Rental.find()
                                .populate('customer')
                                .populate('movie')
                                .sort('-createdAt');
    res.send(movies);
});
  
router.post('/', async (req, res) => {
    const { error } = validateRental(req.body); 
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message
    });

    try {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('The customer with the given ID was not found.');

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('The movie with the given ID was not found.');

        const numberRentedToday = await Rental.find({
                                                movie: movie._id,
                                                dateOfRental: moment().startOf('day')
                                            }).count();

        if (movie.numberInStock < req.body.quantity)
            return res.status(400).send('We have a limited number requested');
        if (numberRentedToday >= movie.dailyRentalRate)
            return res.status(400).send('We have exhausted our rental limit for today');

        const rental = new Rental({
            customer: customer._id,
            movie: movie._id,
            quantity: req.body.quantity,
            numberOfDays: req.body.numberOfDays,
            dateOfReturn: moment().add(req.body.numberOfDays, 'days').startOf('day')
        });

        await rental.save();

        movie.numberInStock -= +req.body.quantity;
        movie.save();

        // new Fawn.Task()
        //     .save('rentals', rental)
        //     .update('Movies', { _id: movie._id }, {
        //         $inc: { numberInStock: -req.body.quantity }
        //     })
        //     .run()
        
        res.send(rental);
    } catch (err) {
        console.log(err)
        res.status(500).send('request failed');
    }
});
  
module.exports = router;