const jwt = require('../../lib/jwt');
const logger = require('../../lib/logger');

const setUserFromTokenIfValid = async (req, res, next) => {
  const authHeader = req.get('authorization');
  if (authHeader) {
    try {
      const [, token] = authHeader.split(' ');
      const user = await jwt.verify(token);
      req.user = user;
      // TODO: maybe verify user against DB?
      // TODO: this is no longer stateless...
      return next();
    } catch (error) {
      logger.error(error);
    }
  }
  return next();
};

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
  const error = new Error('Un-Authorized');
  res.status(401);
  return next(error);
};

module.exports = {
  setUserFromTokenIfValid,
  isLoggedIn,
};
