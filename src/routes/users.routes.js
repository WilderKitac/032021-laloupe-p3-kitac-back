const usersRouter = require('express').Router();

const {
  getAllUsers,
  getOneUserById,
  getOneUserByEmail,
  getOneUserByIdRefresh,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  verifyCredentials,
} = require('../controllers/users.controller');

const { createToken, authorizationWithJsonWebToken, authorizationWithRefreshJsonWebToken, deleteRefreshToken } = require('../services/jwt');

usersRouter.get('/', authorizationWithJsonWebToken, getAllUsers);
// usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getOneUserById);
usersRouter.post('/', authorizationWithJsonWebToken, createOneUser, getOneUserById);
usersRouter.put('/:id', updateOneUser, getOneUserById);
usersRouter.delete('/:id', deleteOneUser);
usersRouter.post('/auth', verifyCredentials);

usersRouter.post('/login', getOneUserByEmail, verifyCredentials, createToken);
usersRouter.post('/refresh_token', authorizationWithRefreshJsonWebToken, getOneUserByIdRefresh, createToken);
usersRouter.post('/logout', authorizationWithJsonWebToken, deleteRefreshToken);

module.exports = usersRouter;
