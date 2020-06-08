const assert = require('assert');
const {query} = require('../../mysql/utils');
const makeQuery = require('./makeQuery');

describe('login/logout integration tests', function () {
  const email = 'abc@example.com';
  const phone = '123-456-7890';
  const password = 'Hunter2';
  let id = '';
  let auth = '';

  before(async function () {
    query(`DELETE FROM users WHERE email = ?`, [email]);
    const data = await makeQuery('createUser', { email, phone, password });
    id = data.createUser.id;
  });

  it('should perform an authed action after login', async function () {
    let data = await makeQuery('login', { email, phone, password });
    assert(data.login.jwt);
    auth = 'Bearer ' + data.login.jwt;
    data = await makeQuery('getUser', { id }, auth);
    assert.strictEqual(data.getUser.id, id);
  });

  it('should not perform an authed action after logout', async function () {
    let error = null;
    let data = await makeQuery('getUser', { id }, auth);
    assert.strictEqual(data.getUser.id, id);
    data = await makeQuery('logout', { id }, auth);

    try {
      data = await makeQuery('getUser', { id }, auth);
console.log('DATA', data)
    } catch (err) {
      error = err;
      assert.strictEqual(err.message, 'Forbidden');
    }

    assert(error);
  });
});
