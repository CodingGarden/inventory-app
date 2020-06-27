const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./address.schema.json');

class Address extends Model {
  static get tableName() {
    return tableNames.address;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Address;
