const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { jwtSecret } = require('../utils/jwtSecretProvider');

const auth = (req, res, next) => {
  throw new AuthError(`headers:${JSON.stringify(req.headers)}; cookies:${JSON.stringify(req.cookies)};`);
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(jwtToken, jwtSecret());
  } catch (err) {
    throw new AuthError('Некорректный токен');
  }

  req.user = payload;
  next();
};

module.exports = auth;
