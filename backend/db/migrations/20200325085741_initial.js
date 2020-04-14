const Knex = require('knex');

const tableNames = require('../../src/constants/tableNames');
const {
  addDefaultColumns,
  createNameTable,
  url,
  email,
  references,
} = require('../../src/lib/tableUtils');

/**
 * @param {Knex} knex
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
    knex.schema.createTable(tableNames.location, (table) => {
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
    table.float('latitude').notNullable();
    table.float('longitude').notNullable();
    references(table, 'state', false);
    references(table, 'country');
  });

  await knex.schema.createTable(tableNames.manufacturer, (table) => {
    table.increments().notNullable();
    table.string('name').notNullable();
    url(table, 'logo_url');
    table.string('description', 1000);
    url(table, 'website_url');
    // `type` text,
    email(table, 'email');
    references(table, 'address');
  });

  // TODO: create the item table... cause thats what its all about
};

exports.down = async (knex) => {
  await Promise.all([
    tableNames.manufacturer,
    tableNames.address,
    tableNames.user,
    tableNames.item_type,
    tableNames.country,
    tableNames.state,
    tableNames.shape,
    tableNames.location,
  ].map((tableName) => knex.schema.dropTable(tableName)));
};
