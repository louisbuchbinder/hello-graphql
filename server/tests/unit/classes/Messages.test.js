const assert = require('assert');
const User = require('../../../classes/User');
const Message = require('../../../classes/Message');

describe('Messages class unit tests', function () {

  xit('should not have an invalid id', function () {});
  xit('should not have an invalid owner', function () {});
  xit('should not have an invalid message', function () {});
  xit('should not have an invalid dateCreated', function () {});
  xit('should not have an invalid dateUpdated', function () {});

  it('should have an id in a message instance', function () {
    const id = 23;
    const message = new Message({ id });

    assert.strictEqual(message.id, id);
  });

  it('should have an owner in a message instance', function () {
    const owner = new User({ email: 'abc@example.com' });
    const message = new Message({ owner });

    assert.strictEqual(message.owner, owner);
  });

  it('should have a message in a message instance', function () {
    const message = 'This is a test';
    const instance = new Message({ message });

    assert.strictEqual(instance.message, message);
  });

  it('should have a dateCreated in a message instance', function () {
    const dateCreated = Date.now();
    const message = new Message({ dateCreated });

    assert.strictEqual(message.dateCreated, dateCreated);
  });

  it('should have a dateUpdated in a message instance', function () {
    const dateUpdated = Date.now();
    const message = new Message({ dateUpdated });

    assert.strictEqual(message.dateUpdated, dateUpdated);
  });

});
