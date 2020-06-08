const assert = require('assert');

class Session {
  /**
   * @throws Error on missing id or userId
   */
  constructor ({id, userId}) {
    assert(id);
    assert(userId);

    this.id = id;
    this.userId = userId;
  }
};

module.exports = Session;
