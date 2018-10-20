const User = require('../models/user');

const QUERIES = {
  getUserByNameQuery: 'SELECT * FROM User WHERE name = ?',
  insertUserQuery: 'INSERT INTO User (name,password_hash,salt) VALUES (?,?,?)',
};

class UserStorage {

  constructor(db) {
    this.db = db;
  }

  getByName(name) {
    return new Promise((resolve, reject) => {
      this.db.get(QUERIES.getUserByNameQuery, name, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.rowToUser(row));
        }
      });
    });
  }

  save(user) {
    return new Promise((resolve, reject) => {
      this.db.run(QUERIES.insertUserQuery, user.name, user.passwordHash, user.salt, function(err) {
        if (err) {
          reject(err);
        } else {
          user.id = this.lastID;
          resolve(user);
        }
      });
    });
  }

  rowToUser(row) {
    return row ? new User(row.id, row.name, row.password_hash, row.salt) : null;
  }
}

module.exports = UserStorage;
