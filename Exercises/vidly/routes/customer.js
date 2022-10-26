const express = require('express');
const { Customer, validateCustomer } = require('../models/Customer');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find()
                        .sort('-createdAt');
    res.send(customers);
});
  
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message
    });

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.is_gold
    });

    try {
        await customer.save();
        res.send(customer);
    } catch (err) {
        console.log(err.errors)
        res.status(500).send('request failed');
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message
    });

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.is_gold
    }, { new: true });
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    
    res.send(customer);
});
  
module.exports = router;