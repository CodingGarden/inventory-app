const db = require('./db');

global.afterAll(async () => {
  await db.destroy();
});
