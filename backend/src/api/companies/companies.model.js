const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./companies.schema.json');

class Company extends Model {
  static get tableName() {
    return tableNames.company;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Company;
