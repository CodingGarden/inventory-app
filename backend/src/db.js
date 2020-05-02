const knex = require('knex');

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

module.exports = connection;
