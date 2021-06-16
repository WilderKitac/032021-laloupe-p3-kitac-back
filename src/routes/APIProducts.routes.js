const APIPRoductsRouter = require('express').Router();
const { getAllAPIProducts, getOneAPIProductsById, createOneAPIProducts, updateOneAPIProducts, deleteOneAPIProducts } = require('../controllers/APIProducts.controller');

APIPRoductsRouter.get('/', getAllAPIProducts);
APIPRoductsRouter.get('/:id', getOneAPIProductsById);
APIPRoductsRouter.post('/', createOneAPIProducts, getOneAPIProductsById);
APIPRoductsRouter.put('/:id', updateOneAPIProducts, getOneAPIProductsById);
APIPRoductsRouter.delete('/:id', deleteOneAPIProducts);

module.exports = APIPRoductsRouter;
