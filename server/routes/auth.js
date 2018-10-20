const jwt = require('express-jwt');
const { JWT_SECRET } = require('../constants');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;

  const [authName, token] = authorization ? authorization.split(' ') : [];

  if (authName === 'Token') {
    return token;
  }

  return null;
};

const auth = {
  required: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: JWT_SECRET,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
