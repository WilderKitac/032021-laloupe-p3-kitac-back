const productsRoute = require('express').Router();
const { getAllProducts, getOneProductById, createOneProduct, updateOneProduct, deleteOneProduct } = require('../controllers/products.controller');
const { getMaterialsByProductId } = require('../controllers/materials.controller');
const { getImagesByProductId } = require('../controllers/productsImages.controller');

productsRoute.get('/', getAllProducts);
productsRoute.get('/:id', getOneProductById);
productsRoute.post('/', createOneProduct, getOneProductById);
productsRoute.put('/:id', updateOneProduct, getOneProductById);
productsRoute.delete('/:id', deleteOneProduct);
productsRoute.get('/:id/materialsImages', getMaterialsByProductId, getImagesByProductId);
productsRoute.get('/:id/images', getImagesByProductId);

module.exports = productsRoute;
