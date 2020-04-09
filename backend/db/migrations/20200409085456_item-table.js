const Knex = require('knex');

const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
} = require('../../src/lib/tableUtils');
const tableNames = require('../../src/constants/tableNames');

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.table(tableNames.address, (table) => {
    table.dropColumn('country_id');
  });

  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
    references(table, tableNames.country);
  });

  await knex.schema.table(tableNames.country, (table) => {
    table.string('code');
  });

  await knex.schema.createTable(tableNames.size, (table) => {
    table.increments();
    table.string('name').notNullable();
    table.float('length');
    table.float('width');
    table.float('height');
    table.float('volume');
    references(table, tableNames.shape);
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.table(tableNames.address, (table) => {
    references(table, tableNames.country);
  });

  await knex.schema.table(tableNames.state, (table) => {
    table.dropColumn('country_id');
  });

  await knex.schema.dropTable(tableNames.size);
};
