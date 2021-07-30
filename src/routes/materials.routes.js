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
const { authorizationWithJsonWebToken } = require('../services/jwt');

materialsRouter.get('/', getAllMaterials);
materialsRouter.get('/:id', getOneMaterialsById);
materialsRouter.post('/', authorizationWithJsonWebToken, uploadImage, createOneMaterials, getOneMaterialsById);
materialsRouter.post('/withImage/:id', authorizationWithJsonWebToken, uploadImage, updateOneMatImg, getOneMaterialsById);
materialsRouter.put('/:id', authorizationWithJsonWebToken, updateOneMaterials, getOneMaterialsById);
materialsRouter.delete('/:id', authorizationWithJsonWebToken, deleteOneMaterials);
materialsRouter.post('/', createOneMaterials, getOneMaterialsById);

module.exports = materialsRouter;
