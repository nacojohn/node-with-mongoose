const express = require('express');
var mongoose = require('mongoose');
const Fawn = require('fawn');

const Joi = require('joi');
Joi.ObjectId = require('joi-objectid')(Joi);

const genres = require('./routes/genres');
const customers = require('./routes/customer');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/logins', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // db connection
    mongoose.connect('mongodb://localhost/mongo-exercises')
        .then(res => {
            // initialize Fawn
            Fawn.init('mongodb://localhost/mongo-exercises');
            console.log('connected to mongodb')
        })
        .catch(errror => console.log(errror));

    console.log(`Listening on port ${port}...`)
});