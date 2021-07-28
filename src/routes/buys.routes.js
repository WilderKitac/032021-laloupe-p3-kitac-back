const buyRouter = require('express').Router();
const { getAllBuys, getOneBuyById, getManyBuysById, createManyBuysItem, updateOneBuy, deleteOneBuy } = require('../controllers/buys.controller');
const { authorizationWithJsonWebToken } = require('../services/jwt');

buyRouter.get('/', getAllBuys);
buyRouter.get('/:id', getOneBuyById);
buyRouter.post('/', authorizationWithJsonWebToken, createManyBuysItem, getManyBuysById);
buyRouter.put('/:id', updateOneBuy, getOneBuyById);
buyRouter.delete('/:id', deleteOneBuy);

module.exports = buyRouter;
