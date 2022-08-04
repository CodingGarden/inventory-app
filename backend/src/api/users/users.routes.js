const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/me', async (req, res) => {
  const user = await User.query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    .where('id', req.user.id)
    .first();
  res.json(user);
});

router.get('/', async (req, res) => {
  const users = await User.query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    // .where('id', req.user.id)
    .where('deleted_at', null);
  res.json(users);
});

module.exports = router;
