const assert = require('assert');
const {query} = require('../../mysql/utils');
const makeQuery = require('./makeQuery');

describe('users crud api integration tests', function () {
  const email = 'abc@example.com';
  const phone = '123-456-7890';
  const password = 'Hunter2';
  let id = '';
  let auth = '';

  before(function () {
    // clear the test user from the database in case of a previous test failure
    return query(`DELETE FROM users WHERE email = ?`, [email]);
  });

  it('should create a user in mysql', function () {
    return makeQuery('createUser', { email, phone, password })
      .then(data => {
        assert.strictEqual(data.createUser.email, email);
        assert.strictEqual(data.createUser.phone, phone);
        assert(data.createUser.id);
	id = data.createUser.id;
      });
  });

  it('should not get a user when not authorized', function () {
    let error = null;
    return makeQuery('getUser', { id })
      .catch(err => error = err)
      .then(_ => {
        assert(error);
        assert.strictEqual(error.message, 'Forbidden');
      });
  });

  it('should not delete a user when not authorized', function () {
    let error = null;
    return makeQuery('deleteUser', { id })
      .catch(err => error = err)
      .then(_ => {
        assert(error);
        assert.strictEqual(error.message, 'Forbidden');
      });
  });

  it('should login a user', function () {
    return makeQuery('login', { email, phone, password })
      .then(data => {
        assert(data.login.jwt);
        auth = 'Bearer ' + data.login.jwt;
      });
  });

  it('should get a user from mysql', function () {
    return makeQuery('getUser', { id }, auth)
      .then(data => {
        assert.strictEqual(data.getUser.email, email);
        assert.strictEqual(data.getUser.phone, phone);
        assert(data.getUser.id);
      });
  });

  it('should delete a user in mysql', function () {
    return makeQuery('deleteUser', { id }, auth)
      .then(data => {
        assert.strictEqual(data.deleteUser, true);
      });
  });

});

