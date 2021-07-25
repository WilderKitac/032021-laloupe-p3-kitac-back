const buyRouter = require('express').Router();
const { getAllBuys, getOneBuyById, getManyBuysById, createManyBuysItem, updateOneBuy, deleteOneBuy } = require('../controllers/buys.controller');

buyRouter.get('/', getAllBuys);
buyRouter.get('/:id', getOneBuyById);
buyRouter.post('/', getManyBuysById, createManyBuysItem);
buyRouter.put('/:id', updateOneBuy, getOneBuyById);
buyRouter.delete('/:id', deleteOneBuy);

module.exports = buyRouter;
