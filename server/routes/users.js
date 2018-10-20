const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const db = require('../db');
const auth = require('./auth');

const router = express.Router();

router.post('/register', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  const { hash, salt } = User.encryptPassword(user.password);

  const finalUser = new User(null, user.name, hash, salt);

  return db.userStorage.save(finalUser)
    .then((user) => res.json(user.toAuthJSON()));
});

router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.name) {
    return res.status(422).json({
      errors: {
        name: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      return res.json(passportUser.toAuthJSON());
    }

    return res.status(400).send('Your name or password is incorrect!');
  })(req, res, next);
});

module.exports = router;
