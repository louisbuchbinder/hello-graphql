const jwtSecretKey = 'shhh...';
const {JWT} = require('jose');

module.exports.sign = function (data) {
  return JWT.sign(data, jwtSecretKey);
};

/**
 * @throws jwt error
 * @returns {}
 */
module.exports.verify = function (data) {
  return JWT.verify(data, jwtSecretKey);
};
