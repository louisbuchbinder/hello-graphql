const Session = require('../classes/Session');
const {query} = require('./utils');

module.exports.insert = async function (session) {

  try {
    const results = await query(
      'INSERT INTO sessions (id, userId) VALUES (?, ?)',
      [session.id, session.userId],
    );

    return new Session(session);
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};

module.exports.exists = async function (session) {
  try {
    const results = await query(
      'SELECT id, userId FROM sessions WHERE id = ? AND userId = ?',
      [session.id, session.userId],
    );

    return (
      results[0] &&
      results[0].id === session.id &&
      results[0].userId === session.userId
    );
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};

module.exports.delete = async function (session) {
  try {
    const results = await query(
      'DELETE FROM sessions WHERE id = ? AND userId = ?',
      [session.id, session.userId],
    );

    return true;
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};

