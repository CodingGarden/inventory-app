const app = require('./app');
const logger = require('./lib/logger');

const port = process.env.PORT || 5050;
app.listen(port, () => {
  logger.info(`Listening at http://localhost:${port}`);
});
