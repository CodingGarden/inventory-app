const { Model } = require('objection');

const tableNames = require('../../constants/tableNames');
const schema = require('./items.schema.json');
const ItemInfo = require('./item_infos/item_infos.model');

class Item extends Model {
  static get tableName() {
    return tableNames.item;
  }

  static get jsonSchema() {
    return schema;
  }

  static get relationMappings() {
    return {
      item_infos: {
        relation: Model.HasManyRelation,
        modelClass: ItemInfo,
        join: {
          from: `${tableNames.item}.id`,
          to: `${tableNames.item_info}.item_id`,
        },
      },
    };
  }
}

module.exports = Item;
