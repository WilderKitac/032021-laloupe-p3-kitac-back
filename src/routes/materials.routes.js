const materialsRouter = require('express').Router();
const {
  getAllMaterials,
  getOneMaterialsById,
  createOneMaterials,
  updateOneMaterials,
  updateOneMatImg,
  deleteOneMaterials,
} = require('../controllers/materials.controller');
const { uploadImage } = require('../controllers/fileUpload.controller');

materialsRouter.get('/', getAllMaterials);
materialsRouter.get('/:id', getOneMaterialsById);
materialsRouter.post('/', uploadImage, createOneMaterials, getOneMaterialsById);
materialsRouter.post('/withImage/:id', uploadImage, updateOneMatImg, getOneMaterialsById);
materialsRouter.put('/:id', updateOneMaterials, getOneMaterialsById);
materialsRouter.delete('/:id', deleteOneMaterials);
materialsRouter.post('/', createOneMaterials, getOneMaterialsById);

module.exports = materialsRouter;
