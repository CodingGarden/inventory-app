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
  await knex.schema.table(tableNames.state, (table) => {
    table.string('code');
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

  await knex.schema.createTable(tableNames.item, (table) => {
    table.increments();
    references(table, tableNames.user);
    table.string('name');
    references(table, tableNames.item_type);
    table.text('description');
    references(table, tableNames.manufacturer);
    references(table, tableNames.size);
    table.string('sku', 42);
    table.boolean('sparks_joy').defaultTo(true);
    addDefaultColumns(table);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable(tableNames.size);
};
