const express = require('express');
const Device = require('../models/device');
const db = require('../db');
const auth = require('./auth');

const router = express.Router();

router.get('/:id', auth.required, (req, res, next) => {
  const { params: { id } } = req;

  return db.deviceStorage.getById(id).then(device => res.json(device));
});

router.get('/', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return db.deviceStorage.getByUserId(id).then(devices => res.json({ devices }));
});

router.post('/', auth.required, (req, res, next) => {
  const { body: { device }, payload: { id } } = req;

  if (!device.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  const finalDevice = new Device(null, device.name, id);

  return db.deviceStorage.save(finalDevice).then(device => res.json(device));
});

router.delete('/:id', auth.required, (req, res, next) => {
  const { params: { id } } = req;

  return db.deviceStorage.remove(id).then(() => res.sendStatus(204));
});

module.exports = router;
