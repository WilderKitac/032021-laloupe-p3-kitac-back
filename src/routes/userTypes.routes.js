const userTypesRouter = require('express').Router();
const {
  getAllUserTypes,
  getOneUserTypeById,
  createOneUserType,
  updateOneUserType,
  deleteOneUserType,
} = require('../controllers/userTypes.controller');

userTypesRouter.get('/', getAllUserTypes);
userTypesRouter.get('/:id', getOneUserTypeById);
userTypesRouter.post('/', createOneUserType, getOneUserTypeById);
userTypesRouter.put('/:id', updateOneUserType, getOneUserTypeById);
userTypesRouter.delete('/:id', deleteOneUserType);

module.exports = userTypesRouter;
