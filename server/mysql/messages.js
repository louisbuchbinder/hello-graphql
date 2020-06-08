const {query} = require('./utils');
const Message = require('../classes/Message');
const users = require('./users');


const select = module.exports.select = async function (message) {
  const messageResult= await query(
    'SELECT * FROM messages WHERE id = ? AND ownerId = ?',
    [message.id, message.owner.id]
  );
  const user = await users.select(message.owner);

  return {...messageResult[0], owner: user};
};

module.exports.selectByOwner = async function (owner) {
  const messages= await query(
    'SELECT * FROM messages WHERE ownerId = ? ORDER BY dateUpdated ASC',
    [owner.id]
  );
  const user = await users.select(owner);

  return messages.map(message => ({...message, owner: user}));
};

module.exports.insert = async function (data) {
  const message = new Message(data);
  try {
   await query(
      'INSERT INTO messages (id, ownerId, message, dateCreated, dateUpdated) VALUES (?, ?, ?, ?, ?)',
      [message.id, message.owner.id, message.message, message.dateCreated, message.dateUpdated],
    );

    return select(message);
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};

