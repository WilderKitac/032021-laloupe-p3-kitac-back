const characterises = require('express').Router();
const {
  getAllCharacterises,
  getOneCharacterisesById,
  createOneCharacterises,
  updateOneCharacterises,
  deleteOneCharacterises,
} = require('../controllers/characterises');

characterises.get('/', getAllCharacterises);
characterises.get('/:id', getOneCharacterisesById);
characterises.post('/', createOneCharacterises, getOneCharacterisesById);
characterises.put('/:id', updateOneCharacterises, getOneCharacterisesById);
characterises.delete('/:id', deleteOneCharacterises);

module.exports = characterises;
