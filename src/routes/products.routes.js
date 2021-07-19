const productsRoute = require('express').Router();
const {
  getAllProducts,
  getOneProductById,
  createOneProduct,
  updateOneProduct,
  deleteOneProduct,
  getAllProductsWithCat,
} = require('../controllers/products.controller');
const { getMaterialsByProductId } = require('../controllers/materials.controller');
const { getImagesByProductId } = require('../controllers/productsImages.controller');
const { getSizeByProductId } = require('../controllers/size.controller');
const { getSuppliesByProductId } = require('../controllers/supplies.controller');
const { assignManyCategoryProduct } = require('../controllers/categoryProduct.controller');
const { assignManyMaterialProduct } = require('../controllers/madesOf.controller');

productsRoute.get('/', getAllProducts, getAllProductsWithCat);
productsRoute.get('/:id', getOneProductById);
productsRoute.post('/', createOneProduct, getOneProductById, assignManyCategoryProduct, assignManyMaterialProduct);
productsRoute.put('/:id', updateOneProduct, getOneProductById);
productsRoute.delete('/:id', deleteOneProduct);
productsRoute.get('/:id/productsheet', getMaterialsByProductId, getImagesByProductId, getSizeByProductId, getSuppliesByProductId, getOneProductById);

module.exports = productsRoute;
