const categoryProduct = require('express').Router();
const {
  getAllCategoryProduct,
  getOneCategoryProductById,
  createOneCategoryProduct,
  updateOneCategoryProduct,
  deleteOneCategoryProduct,
} = require('../controllers/categoryProduct.controller');

categoryProduct.get('/', getAllCategoryProduct);
categoryProduct.get('/:id', getOneCategoryProductById);
categoryProduct.post('/', createOneCategoryProduct, getOneCategoryProductById);
categoryProduct.put('/:id', updateOneCategoryProduct, getOneCategoryProductById);
categoryProduct.delete('/:id', deleteOneCategoryProduct);

module.exports = categoryProduct;
