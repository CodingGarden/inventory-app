const express = require('express');

const ItemInfo = require('./item_infos.model');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res, next) => {
  try {
    const items = await ItemInfo.query().where('deleted_at', null);
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // TODO: set user id by logged in user
    req.body.item_id = Number(req.params.item_id);
    const item = await ItemInfo.query().insert(req.body);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const item = await ItemInfo.query().patchAndFetchById(
      req.params.id,
      req.body
    );
    res.json(item);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
