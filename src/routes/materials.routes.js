const materialsRouter = require('express').Router();
const { getAllMaterials, getOneMaterialsById, createOneMaterials, updateOneMaterials, deleteOneMaterials } = require('../controllers/materials.controller');

materialsRouter.get('/', getAllMaterials);
materialsRouter.get('/:id', getOneMaterialsById);
materialsRouter.post('/', createOneMaterials, getOneMaterialsById);
materialsRouter.put('/:id', updateOneMaterials, getOneMaterialsById);
materialsRouter.delete('/:id', deleteOneMaterials);

module.exports = materialsRouter;
