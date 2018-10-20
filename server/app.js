const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
const { SESSION_SECRET } = require('./constants');
const passport = require('passport');

const apiRouter = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use('/api', apiRouter);

module.exports = app;
