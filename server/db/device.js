const Device = require('../models/device');

const QUERIES = {
  getDevicesByUserQuery: 'SELECT * FROM Device WHERE user_id = ?',
  insertDeviceQuery: 'INSERT INTO Device (name,user_id) VALUES (?,?)',
  deleteDeviceQuery: 'DELETE FROM Device WHERE id = ?'
};

class DeviceStorage {

  constructor(db) {
    this.db = db;
  }

  getByUserId(id) {
    return new Promise((resolve, reject) => {
      this.db.all(QUERIES.getDevicesByUserQuery, id, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.map(this.rowToDevice));
        }
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      this.db.run(QUERIES.deleteDeviceQuery, id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  save(device) {
    return new Promise((resolve, reject) => {
      this.db.run(QUERIES.insertDeviceQuery, device.name, device.userId, function(err) {
        if (err) {
          reject(err);
        } else {
          device.id = this.lastID;
          resolve(device);
        }
      });
    });
  }

  rowToDevice(row) {
    return row ? new Device(row.id, row.name, row.password_hash, row.salt) : null;
  }
}

module.exports = DeviceStorage;
