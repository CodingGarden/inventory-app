const { Model } = require('objection');

const tableNames = require('../../../constants/tableNames');
const schema = require('./item_infos.schema.json');

class ItemInfos extends Model {
  static get tableName() {
    return tableNames.item_info;
  }

  static get jsonSchema() {
    return schema;
  }
}

module.exports = ItemInfos;
