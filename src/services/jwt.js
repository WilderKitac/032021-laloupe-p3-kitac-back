/* eslint-disable dot-notation */
/* eslint-disable no-underscore-dangle */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, JWT_LIFETIME } = process.env;

const createToken = (req, res) => {
  const token = jwt.sign({ id: req.user ? req.user.id : 0, role: req.user.user_types_id }, ACCESS_JWT_SECRET, {
    expiresIn: JWT_LIFETIME,
  });
  const refreshToken = jwt.sign({ id: req.user ? req.user.id : 0, role: req.user.user_types_id }, REFRESH_JWT_SECRET, { expiresIn: 90 });
  res.cookie('refresh_token', refreshToken, { maxAge: 3600000 });
  res.json({ id: req.user ? req.user.id : 0, role: req.user.user_types_id, token });
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
// eslint-disable-next-line consistent-return
const authorizationWithRefreshJsonWebToken = (req, res, next) => {
  // console.log('Cookie token: ', req.cookies.__refresh__token);
  if (req.cookies.refresh_token) {
    jwt.verify(req.cookies.refresh_token, REFRESH_JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie('refresh_token');
        return res.status(401).send("You're not allowed to access this data");
      }
      // console.log(decoded);
      req.userId = decoded.id;
      return next();
    });
  } else {
    res.clearCookie('refresh_token');
    return res.status(401).send("You're not allowed to access this data");
  }
};

const deleteRefreshToken = (req, res) => {
  res.clearCookie('refresh_token');
  return res.sendStatus(204);
};

module.exports = {
  createToken,
  authorizationWithJsonWebToken,
  authorizationWithRefreshJsonWebToken,
  deleteRefreshToken,
};
