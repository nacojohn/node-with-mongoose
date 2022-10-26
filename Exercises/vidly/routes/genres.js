const express = require('express');
const Joi = require('joi');
const Genre = require('../models/Genre');
const router = express.Router();

router.get('/', async (req, res) => {
  const genres = await Genre.find()
                      .sort('-createdAt')
                      .select('_id name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send({
    status: false,
    message: error.details[0].message
  });

  const genre = new Genre({
    name: req.body.name
  });

  await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send({
    status: false,
    message: error.details[0].message
  });
  
  genre.name = req.body.name; 
  await genre.save();

  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;