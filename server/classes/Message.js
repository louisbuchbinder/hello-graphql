const mysql = require('../mysql');

class Message {
  /**
   * @return {boolean}
   */
  static isValidId(id) {
    return true;
  }

  /**
   * @return {boolean}
   */
  static isValidOwner(owner) {
    return !!owner;
  }

  /**
   * @return {boolean}
   */
  static isValidMessage(message) {
    return !!message;
  }

  /**
   * @return {boolean}
   */
  static isValidDate(date) {
    return !!date;
  }

  constructor({ id, owner, message, dateCreated, dateUpdated }) {
    if (Message.isValidId(id)) {
      this.id = id;
    }

    if (Message.isValidOwner(owner)) {
      this.owner = owner;
    }

    if (Message.isValidMessage(message)) {
      this.message = message;
    }

    const now = Date.now();

    if (Message.isValidDate(dateCreated)) {
      this.dateCreated = dateCreated;
    } else {
      this.dateCreated = now;
    }

    if (Message.isValidDate(dateUpdated)) {
      this.dateUpdated = dateUpdated;
    } else {
      this.dateUpdated = now;
    }

  }

}

module.exports = Message;
