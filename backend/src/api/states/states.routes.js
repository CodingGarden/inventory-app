const express = require('express');

const queries = require('./states.queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const states = await queries.find();
  res.json(states);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const state = await queries.get(parseInt(id, 10) || 0);
    if (state) {
      return res.json(state);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
