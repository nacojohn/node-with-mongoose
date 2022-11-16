const express = require('express');
const { Genre } = require('../models/Genre');
const { Movie, validateMovie } = require('../models/movie');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find()
                        .sort('-createdAt');
    res.send(movies);
});
  
router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message
    });

    try {
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send('The genre with the given ID was not found.');

        const movie = new Movie({
            title: req.body.title,
            genre: new Genre({
                _id: genre._id,
                name: genre.name
            }),
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        });

        await movie.save();
        res.send(movie);
    } catch (err) {
        console.log(err)
        res.status(500).send('request failed');
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message
    });

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        'genre.name': req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    }, { new: true });
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);
});
  
module.exports = router;