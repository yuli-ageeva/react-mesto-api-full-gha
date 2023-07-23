const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const extractBearerToken = (header) => {
  return header.replace('Bearer ', '');
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const bearerToken = extractBearerToken(authorization);

  let payload;
  try {
    payload = jwt.verify(bearerToken, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthError('Некорректный токен');
  }

  req.user = payload;
  next();
};

module.exports = auth;
