const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
} = require('../../src/lib/tableUtils');

/**
 * @param {import('knex')} knex
 */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.user, (table) => {
      table.increments().notNullable();
      email(table, 'email').notNullable().unique();
      table.string('name').notNullable();
      table.string('password', 127).notNullable();
      table.datetime('last_login');
      addDefaultColumns(table);
    }),
    createNameTable(knex, tableNames.item_type),
    createNameTable(knex, tableNames.country),
    createNameTable(knex, tableNames.state),
    createNameTable(knex, tableNames.shape),
    knex.schema.createTable(tableNames.inventory_location, (table) => {
      table.increments().notNullable();
      table.string('name').notNullable().unique();
      table.string('description', 1000);
      url(table, 'image_url');
      addDefaultColumns(table);
    }),
  ]);

  await knex.schema.createTable(tableNames.address, (table) => {
    table.increments().notNullable();
    table.string('street_address_1', 50).notNullable();
    table.string('street_address_2', 50);
    table.string('city', 50).notNullable();
    table.string('zipcode', 15).notNullable();
    table.double('latitude').notNullable();
    table.double('longitude').notNullable();
    references(table, 'state', false);
    references(table, 'country');
    addDefaultColumns(table);
    table.unique([
      'street_address_1',
      'street_address_2',
      'city',
      'zipcode',
      'country_id',
      'state_id',
    ]);
  });

  await knex.schema.createTable(tableNames.company, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'logo_url');
    table.string('description', 1000);
    url(table, 'website_url');
    // `type` text,
    email(table, 'email');
    references(table, 'address');
    addDefaultColumns(table);
  });
};

exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.company,
      tableNames.address,
      tableNames.user,
      tableNames.item_type,
      tableNames.country,
      tableNames.state,
      tableNames.shape,
      tableNames.inventory_location,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
