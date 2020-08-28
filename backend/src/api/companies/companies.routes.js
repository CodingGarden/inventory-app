const express = require('express');

const Company = require('./companies.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.query().where('deleted_at', null);
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
