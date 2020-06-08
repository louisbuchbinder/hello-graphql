const crypto = require('crypto');
const users = require('../mysql/users');
const sessions = require('../mysql/sessions');
const bcrypt = require('bcrypt');
const {JWT} = require('jose');
const {sign} = require('../jwt.js');

module.exports = async function (data) {
  const saltRounds = 10;
  const {id, passwordHash} = await users.selectPasswordHash(data);
  const successfulLogin = await bcrypt.compare(data.password, passwordHash);

  if (!successfulLogin) {
    return {};
  }

  const session = await sessions.insert({
    id: crypto.randomBytes(32).toString('hex'),
    userId: id
  });

  return {
    jwt: sign({session})
  };
};
