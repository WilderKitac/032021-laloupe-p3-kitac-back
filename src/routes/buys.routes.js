const buyRouter = require('express').Router();
const { getAllBuys, getOneBuyById, createOneBuy, updateOneBuy, deleteOneBuy } = require('../controllers/buys.controller');

buyRouter.get('/', getAllBuys);
buyRouter.get('/:id', getOneBuyById);
buyRouter.post('/', createOneBuy, getOneBuyById);
buyRouter.put('/:id', updateOneBuy, getOneBuyById);
buyRouter.delete('/:id', deleteOneBuy);

module.exports = buyRouter;
