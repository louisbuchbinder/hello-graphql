const {query} = require('./utils');
const User = require('../classes/User');

/**
 * Insert the user into mysql
 * and resolve the newly created user
 * @return {promise<User>}
 */
module.exports.insert = async function (user) {
  try {
    const results = await query(
      'INSERT INTO users (id, phone, email, passwordHash) VALUES (?, ?, ?, ?)',
      [user.id, user.phone, user.email, user.passwordHash],
    );

    return new User(user);
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};


/**
 * Select the user from mysql
 * and resolve the user
 * @return {promise<User>}
 */
module.exports.select = async function (user) {
  try {
    const results = await query(
      'SELECT id, email, phone FROM users WHERE id = ?',
      [user.id]
    );

    return new User(results[0]);
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};

/**
 * Select the id and passwordHash
 * for the user from mysql
 * @return {promise<{passwordHash: String, id: String}>}
 */
module.exports.selectPasswordHash = async function (user) {
  let sql = 'SELECT id, passwordHash FROM users WHERE';
  let replacements = [];

  if (user.email) {
    sql += ' email = ?';
    replacements.push(user.email);
  }

  if (user.email && user.phone) {
    sql += ' AND';
  }

  if (user.phone) {
    sql += ' phone = ?';
    replacements.push(user.phone);
  }

  try {
    const results = await query(sql, replacements);
    return results[0];
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};

/**
 * Delete the user from mysql
 * @return {promise<boolean>}
 */
module.exports.delete = async function (user) {
  try {
    const results = await query(
      'DELETE FROM users WHERE id = ?',
      [user.id]
    );
    return true
  } catch (err) {
    console.log(err);
    // TODO: sanitize these errors for the client
    return err;
  }
};
