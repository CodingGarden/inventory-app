const jwt = require('jsonwebtoken');

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

module.exports = {
  sign,
};
