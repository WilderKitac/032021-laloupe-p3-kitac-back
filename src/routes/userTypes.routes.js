const kitacRouter = require('express').Router();
const {
  getAllUserTypes,
  getOneUserTypeById,
  createOneUserType,
  updateOneUserType,
  deleteOneUserType,
} = require('../controllers/userTypes.controller');

kitacRouter.get('/', getAllUserTypes);
kitacRouter.get('/:id', getOneUserTypeById);
kitacRouter.post('/', createOneUserType, getOneUserTypeById);
kitacRouter.put('/:id', updateOneUserType, getOneUserTypeById);
kitacRouter.delete('/:id', deleteOneUserType);

module.exports = kitacRouter;
