const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    // const { error } = valida
    // if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: res.body.name
    };

    genres.push(genre);

    res.send(genre);
})