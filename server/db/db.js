const sqlite3 = require('sqlite3').verbose();
const { DB_NAME } = require('../constants');

const db = new sqlite3.Database(DB_NAME);

module.exports = db;
