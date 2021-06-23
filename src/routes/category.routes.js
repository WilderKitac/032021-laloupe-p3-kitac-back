const categoryRouter = require('express').Router();
const {
  getAllCategory,
  getOneCategoryById,
  createOneCategory,
  updateOneCategory,
  deleteOneCategory,
  getProductsByCategoryId,
} = require('../controllers/category.controller');

categoryRouter.get('/', getAllCategory);
categoryRouter.get('/:id', getOneCategoryById);
categoryRouter.post('/', createOneCategory, getOneCategoryById);
categoryRouter.put('/:id', updateOneCategory, getOneCategoryById);
categoryRouter.delete('/:id', deleteOneCategory);
categoryRouter.get('/:id/Products', getProductsByCategoryId);

module.exports = categoryRouter;
