/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, JWT_LIFETIME } = process.env;

const createToken = (req, res) => {
  const token = jwt.sign({ id: req.user ? req.user.id : 0, role: req.user.user_types }, ACCESS_JWT_SECRET, { expiresIn: Math.floor(JWT_LIFETIME / 1000) });
  const refreshToken = jwt.sign({ id: req.user ? req.user.id : 0, role: req.user.user_types }, REFRESH_JWT_SECRET, { expiresIn: 90 });
  res.cookie('__refresh__token', refreshToken, { httpOnly: true, secure: false, maxAge: 90000, sameSite: 'lax' });
  res.json({ user: { id: req.user ? req.user.id : 0, email: req.user ? req.user.email : '' }, expires_in: Math.floor(JWT_LIFETIME / 1000), token });
};

const authorizationWithJsonWebToken = (req, res, next) => {
  // console.log('Cookie token: ', req.cookies.__access__token);
  if (req.headers['authorization'] && req.headers['authorization'].split(' ')[1] !== 'null') {
    const token = req.headers['authorization'].split(' ')[1];
    if (jwt.verify(token, ACCESS_JWT_SECRET)) {
      return next();
    }
    return res.status(401).send("You're not allowed to access this data");
  }
  return res.status(401).send("You're not allowed to access this data");
};
const authorizationWithRefreshJsonWebToken = (req, res, next) => {
  // console.log('Cookie token: ', req.cookies.__refresh__token);
  if (req.cookies.__refresh__token) {
    jwt.verify(req.cookies.__refresh__token, REFRESH_JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('__refresh__token');
        return res.status(401).send("You're not allowed to access this data");
      }
      // console.log(decoded);
      req.userId = decoded.id;
      return next();
    });
  } else {
    res.clearCookie('__refresh__token');
    return res.status(401).send("You're not allowed to access this data");
  }
};

const deleteRefreshToken = (req, res) => {
  res.clearCookie('__refresh__token');
  return res.sendStatus(204);
};

module.exports = {
  createToken,
  authorizationWithJsonWebToken,
  authorizationWithRefreshJsonWebToken,
  deleteRefreshToken,
};
