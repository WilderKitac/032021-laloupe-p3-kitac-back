const productsRoute = require('express').Router();
const { getAllProducts, getOneProductById, createOneProduct, updateOneProduct, deleteOneProduct } = require('../controllers/products.controller');

productsRoute.get('/', getAllProducts);
productsRoute.get('/:id', getOneProductById);
productsRoute.post('/', createOneProduct, getOneProductById);
productsRoute.put('/:id', updateOneProduct, getOneProductById);
productsRoute.delete('/:id', deleteOneProduct);

module.exports = productsRoute;
