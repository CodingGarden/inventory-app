const express = require('express');

const project = require('../constants/project');
const states = require('./states/states.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/states', states);

module.exports = router;
