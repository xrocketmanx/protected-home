const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

class User {
  constructor(id, name, passwordHash, salt) {
    this.id = id;
    this.name = name;
    this.passwordHash = passwordHash;
    this.salt = salt;
  }

  static encryptPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return { salt, hash };
  }

  validatePassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.passwordHash === hash;
  }

  generateJWT() {
    return jwt.sign({
      name: this.name,
      id: this.id
    }, JWT_SECRET);
  }

  toAuthJSON() {
    return {
      id: this.id,
      name: this.name,
      token: this.generateJWT()
    };
  }

}

module.exports = User;