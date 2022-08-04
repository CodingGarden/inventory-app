const crypto = require('crypto');
const bcrypt = require('bcrypt');

const logger = require('../../src/lib/logger');
const tableNames = require('../../src/constants/tableNames');
const countries = require('../../src/constants/countries');
const us_states = require('../../src/constants/us_states');

/**
 * @param {import('knex')} knex
 */
exports.seed = async (knex) => {
  await Promise.all(Object.keys(tableNames).map((name) => knex(name).del()));

  const password = `A${crypto.randomBytes(15).toString('hex')}?`;

  const user = {
    email: 'cj@null.computer',
    name: 'CJ',
    password: await bcrypt.hash(password, 12),
  };

  const [createdUser] = await knex(tableNames.user).insert(user).returning('*');

  if (process.env.NODE_ENV !== 'test') {
    logger.info(
      'User created:',
      {
        password,
      },
      createdUser
    );
  }

  const insertedCountries = await knex(tableNames.country).insert(
    countries,
    '*'
  );

  const usa = insertedCountries.find((country) => country.code === 'US');

  us_states.forEach((state) => {
    state.country_id = usa.id;
  });

  await knex(tableNames.state).insert(us_states);
};
