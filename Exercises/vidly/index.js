const genres = require('./routes/genres');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    // db connection
    mongoose.connect('mongodb://localhost:27017/mongo-exercises')
        .then(res => console.log('connected to mongodb'))
        .catch(errror => console.log(errror));

    console.log(`Listening on port ${port}...`)
});