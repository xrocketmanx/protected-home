const db = require('./db');
const UserStorage = require('./user');
const DeviceStorage = require('./device');

exports.userStorage = new UserStorage(db);
exports.deviceStorage = new DeviceStorage(db);
