const jwt = require('jsonwebtoken');

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    });
  });
}

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        // lower expiration for privileged users...
        // need refresh token...
        expiresIn: '1m',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

module.exports = {
  verify,
  sign,
};
