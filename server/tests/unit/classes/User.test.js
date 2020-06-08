const assert = require('assert');
const User = require('../../../classes/User');

describe('User class unit tests', function () {

  xit('should not have an invalid email', function () {});
  xit('should not have an invalid phone', function () {});
  xit('should not have an invalid id', function () {});

  it('should have an email in a user instance', function () {
    const email = 'abc@example.com';
    const user = new User({ email });

    assert.strictEqual(user.email, email);
  });

  it('should have a phone in a user instance', function () {
    const phone = '123-456-7890';
    const user = new User({ phone });

    assert.strictEqual(user.phone, phone);
  });

  it('should have an id in a user instance', function () {
    const id = 23;
    const user = new User({ id });

    assert.strictEqual(user.id, id);
  });

});
