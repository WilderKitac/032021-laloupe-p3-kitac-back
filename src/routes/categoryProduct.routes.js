const categoryProductRouter = require('express').Router();
const {
  getAllCategoryProduct, getOneCategoryProductById, createOneCategoryProduct, updateOneCategoryProduct, deleteOneCategoryProduct} = require('../controllers/categoryProduct.controller');

categoryProductRouter.get('/', getAllCategoryProduct);
categoryProductRouter.get('/:id', getOneCategoryProductById);
categoryProductRouter.post('/', createOneCategoryProduct, getOneCategoryProductById);
categoryProductRouter.put('/:id', updateOneCategoryProduct, getOneCategoryProductById);
categoryProductRouter.delete('/:id', deleteOneCategoryProduct);

module.exports = categoryProductRouter;
