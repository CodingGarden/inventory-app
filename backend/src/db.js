const knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

/**
 * @type {import('knex').Knex} knex
 */
const connection = knex(connectionConfig);

Model.knex(connection);

module.exports = connection;
