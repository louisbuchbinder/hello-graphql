const users = require('../mysql/users');
const messages = require('../mysql/messages');

module.exports = async function (data, req) {
  const session = req.res.locals.session;

  if (!session) {
    throw new Error('Forbidden');
  }

  return await messages.select({...data, owner: {id: session.userId}});
};
