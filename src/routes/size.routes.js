const sizeRouter = require('express').Router();
const { getAllSize, getOneSizeById, createOneSize, updateOneSize, deleteOneSize } = require('../controllers/size.controller');

sizeRouter.get('/', getAllSize);
sizeRouter.get('/:id', getOneSizeById);
sizeRouter.post('/', createOneSize, getOneSizeById);
sizeRouter.put('/:id', updateOneSize, getOneSizeById);
sizeRouter.delete('/:id', deleteOneSize);

module.exports = sizeRouter;
