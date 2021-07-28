const productsImages = require('express').Router();
const {
  getAllImages,
  getOneImagesById,
  getManyImagesById,
  createOneImages,
  createManyImages,
  updateOneImages,
  deleteOneImages,
} = require('../controllers/productsImages.controller');
const { uploadMultImages } = require('../controllers/fileUpload.controller');
const { authorizationWithJsonWebToken } = require('../services/jwt');

productsImages.get('/', getAllImages);
productsImages.get('/:id', getOneImagesById);
productsImages.post('/', createOneImages, getOneImagesById);
productsImages.post('/multer', authorizationWithJsonWebToken, uploadMultImages, createManyImages, getManyImagesById);
productsImages.put('/:id', updateOneImages, getOneImagesById);
productsImages.delete('/:id', authorizationWithJsonWebToken, deleteOneImages);

module.exports = productsImages;
