const express = require('express');

const Address = require('./addresses.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const addresses = await Address.query().where('deleted_at', null);
    res.json(addresses);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    ['street_address_1', 'street_address_2', 'city', 'zipcode'].forEach(
      (prop) => {
        if (req.body[prop]) {
          req.body[prop] = req.body[prop].toString().toLowerCase().trim();
        }
      }
    );
    const address = await Address.query().insert(req.body);
    res.json(address);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
