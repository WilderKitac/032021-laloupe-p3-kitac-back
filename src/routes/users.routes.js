const kitacRouter = require('express').Router();
const {
  getAllUsers,
  getOneUserById,
  createOneUser,
  updateOneUser,
  deleteOneUser,
} = require('../controllers/users.controller');

kitacRouter.get('/', getAllUsers);
kitacRouter.get('/:id', getOneUserById);
kitacRouter.post('/', createOneUser, getOneUserById);
kitacRouter.put('/:id', updateOneUser, getOneUserById);
kitacRouter.delete('/:id', deleteOneUser);

module.exports = kitacRouter;
