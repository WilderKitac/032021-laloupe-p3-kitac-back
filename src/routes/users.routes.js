const usersRouter = require('express').Router();
const { getAllUsers, getOneUserById, createOneUser, updateOneUser, deleteOneUser, verifyCredentials } = require('../controllers/users.controller');

usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getOneUserById);
usersRouter.post('/', createOneUser, getOneUserById);
usersRouter.put('/:id', updateOneUser, getOneUserById);
usersRouter.delete('/:id', deleteOneUser);
usersRouter.post('/auth', verifyCredentials);
// userRoutes.post('/register', register);
// usersRoutes.post('/login', register);

module.exports = usersRouter;
