const materialsRouter = require('express').Router();
const {
  getAllMaterials,
  getOneMaterialsById,
  createOneMaterials,
  createAssetMaterial,
  updateOneMaterials,
  deleteOneMaterials,
} = require('../controllers/materials.controller');

materialsRouter.get('/', getAllMaterials);
materialsRouter.get('/:id', getOneMaterialsById);
materialsRouter.post('/', createOneMaterials, getOneMaterialsById);
materialsRouter.put('/:id', updateOneMaterials, getOneMaterialsById);
materialsRouter.delete('/:id', deleteOneMaterials);
materialsRouter.post('/', createOneMaterials, getOneMaterialsById);
materialsRouter.post('/Create', createAssetMaterial, getOneMaterialsById);

module.exports = materialsRouter;
