const assert = require('assert');
const {query} = require('../../mysql/utils');
const makeQuery = require('./makeQuery');

describe('messages crud integration tests', function () {
  const email = 'abc@example.com';
  const phone = '123-456-7890';
  const password = 'Hunter2';
  let id = '';
  let auth = '';

  before(async function () {
    query(`DELETE FROM users WHERE email = ?`, [email]);
    const data = await makeQuery('createUserAndLogin', { email, phone, password });
    id = data.createUser.id;
    auth = 'Bearer ' + data.login.jwt;
  });

  it('should post a message', async function () {
    const text = 'this is a test';
    const data = await makeQuery('postMessage', { message: text }, auth);
    assert.strictEqual(data.postMessage.owner.id, id);
    assert.strictEqual(data.postMessage.owner.email, email);
    assert.strictEqual(data.postMessage.owner.phone, phone);
    assert.strictEqual(data.postMessage.message, text);
    assert(data.postMessage.id);
  });

  it('should get a message', async function () {
    const text = 'this is a test';
    let data = await makeQuery('postMessage', { message: text }, auth);
    data = await makeQuery('getMessage', { id: data.postMessage.id }, auth);
    assert.strictEqual(data.getMessage.owner.id, id);
    assert.strictEqual(data.getMessage.owner.email, email);
    assert.strictEqual(data.getMessage.owner.phone, phone);
    assert.strictEqual(data.getMessage.message, text);
    assert(data.getMessage.id);
  });

  xit('should delete a message');

});

describe('getMessages integration tests', function () {
  const email = 'abc@example.com';
  const phone = '123-456-7890';
  const password = 'Hunter2';
  let id = '';
  let auth = '';

  before(async function () {
    query(`DELETE FROM users WHERE email = ?`, [email]);
    const data = await makeQuery('createUserAndLogin', { email, phone, password });
    id = data.createUser.id;
    auth = 'Bearer ' + data.login.jwt;
  });

  it('should fetch all the messages for a user', async function () {
    const message0 = 'Hello World';
    const message1 = 'Another one bites the dust';
    const message2 = 'and a third message';

    await makeQuery('postMessage', { message: message0 }, auth);
    await makeQuery('postMessage', { message: message1 }, auth);
    await makeQuery('postMessage', { message: message2 }, auth);

    const data = await makeQuery('getMessages', { id }, auth);
    assert.strictEqual(data.getMessages[0].message, message0);
    assert.strictEqual(data.getMessages[1].message, message1);
    assert.strictEqual(data.getMessages[2].message, message2);
  });

});

