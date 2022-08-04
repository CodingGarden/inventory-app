const express = require('express');

const project = require('../constants/project');
const authMiddlewares = require('./auth/auth.middlewares');

const states = require('./states/states.routes');
const users = require('./users/users.routes');
const addresses = require('./addresses/addresses.routes');
const companies = require('./companies/companies.routes');
const items = require('./items/items.routes');
const auth = require('./auth/auth.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

router.use('/states', authMiddlewares.isLoggedIn, states);
router.use('/users', authMiddlewares.isLoggedIn, users);
router.use('/auth', auth);
router.use('/addresses', authMiddlewares.isLoggedIn, addresses);
router.use('/companies', authMiddlewares.isLoggedIn, companies);
router.use('/items', authMiddlewares.isLoggedIn, items);

module.exports = router;
