const categoryRouter = require('express').Router();
const { getAllCategory, getOneCategoryById, createOneCategory, updateOneCategory, deleteOneCategory } = require('../controllers/category.controller');

categoryRouter.get('/', getAllCategory);
categoryRouter.get('/:id', getOneCategoryById);
categoryRouter.post('/', createOneCategory, getOneCategoryById);
categoryRouter.put('/:id', updateOneCategory, getOneCategoryById);
categoryRouter.delete('/:id', deleteOneCategory);

module.exports = categoryRouter;
