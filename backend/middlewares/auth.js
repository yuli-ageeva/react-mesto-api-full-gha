const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  throw new AuthError(`headers:${JSON.stringify(req.headers)}`)
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthError('Некорректный токен');
  }

  req.user = payload;
  next();
};

module.exports = auth;
