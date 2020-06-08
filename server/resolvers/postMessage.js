const messages = require('../mysql/messages');
const users = require('../mysql/users');
const crypto = require('crypto');

module.exports = async function (data, req) {
  const session = req.res.locals.session;
  const id = crypto.randomBytes(8).toString('hex');

  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    const message = await messages.insert({ ...data, owner: {id: session.userId}, id });
    
    return message;
  } catch (err) {
    // TODO: Sanitize this error for the client
    return err;
  }

};
