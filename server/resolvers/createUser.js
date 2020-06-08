const users = require('../mysql/users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = async function (data) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(data.password, saltRounds);
  const id = crypto.randomBytes(8).toString('hex');
  return await users.insert({ ...data, passwordHash, id });
};
