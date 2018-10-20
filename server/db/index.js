const db = require('./db');
const UserStorage = require('./user');
const DeviceStorage = require('./device');

module.exports.userStorage = new UserStorage(db);
module.exports.deviceStorage = new DeviceStorage(db);
