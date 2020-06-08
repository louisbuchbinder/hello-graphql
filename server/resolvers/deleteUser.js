const User = require('../classes/User');
const users = require('../mysql/users');

module.exports = async function (data, req) {
  const session = req.res.locals.session;

  if (!session || session.userId !== data.id) {
    throw new Error('Forbidden');
  }

  return await users.delete(new User(data));
};

