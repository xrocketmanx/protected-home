const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../db');

passport.use(new LocalStrategy({
  usernameField: 'user[name]',
  passwordField: 'user[password]',
}, (name, password, done) => {
  db.userStorage.getByName(name)
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));
