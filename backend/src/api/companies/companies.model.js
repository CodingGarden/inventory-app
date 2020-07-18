const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');

class Company extends Model {
  static get tableName() {
    return tableNames.company;
  }
}

module.exports = Company;
