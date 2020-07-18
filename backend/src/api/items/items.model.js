const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./items.schema.json');

class Item extends Model {
  static get tableName() {
    return tableNames.item;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = Item;
