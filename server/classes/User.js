class User {
  /**
   * @return {boolean}
   */
  static isValidId(id) {
    return true;
  }

  /**
   * @return {boolean}
   */
  static isValidEmail(email) {
    return true;
  }

  /**
   * @return {boolean}
   */
  static isValidPhone(phone) {
    return true;
  }

  /**
   * Assign properties to the user instance
   */
  constructor({id, email, phone}) {
    if (User.isValidId(id)) {
      this.id = id;
    }
    if (User.isValidEmail(email)) {
      this.email = email;
    }

    if (User.isValidPhone(phone)) {
      this.phone = phone;
    }
  };
};

module.exports = User;
