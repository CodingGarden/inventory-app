const express = require('express');
const yup = require('yup');
// TODO: extract to general hashing util
const bcrypt = require('bcrypt');

const jwt = require('../../lib/jwt');
const User = require('../users/users.model');

const router = express.Router();

const schema = yup.object().shape({
  name: yup.string().trim().min(2).required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
});

const errorMessages = {
  invalidLogin: 'Invalid login.',
  emailInUse: 'Email in use.',
};

router.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const createUser = {
      name,
      email,
      password,
    };
    await schema.validate(createUser, {
      abortEarly: false,
    });
    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const error = new Error(errorMessages.emailInUse);
      res.status(403);
      throw error;
    }
    // TODO: get rounds from config
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await User.query().insert({
      name,
      email,
      password: hashedPassword,
    });
    delete insertedUser.password;
    const payload = {
      id: insertedUser.id,
      name,
      email,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// TODO: stateless refresh tokens...
router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // TODO: should we validate password with regex on sigin?
    // TODO: password validation changes would effect old users...
    await schema.validate(
      {
        name: 'DocD',
        email,
        password,
      },
      {
        abortEarly: false,
      }
    );
    const user = await User.query().where({ email }).first();
    if (!user) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const payload = {
      id: user.id,
      name: user.name,
      // TODO: get roles from DB
      roles: ['admin', 'list:users'],
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
