const characterisesRouter = require('express').Router();
const {
  getAllCharacterises,
  getOneCharacterisesById,
  createOneCharacterises,
  updateOneCharacterises,
  deleteOneCharacterises,
} = require('../controllers/characterises.controller');

characterisesRouter.get('/', getAllCharacterises);
characterisesRouter.get('/:id', getOneCharacterisesById);
characterisesRouter.post('/', createOneCharacterises, getOneCharacterisesById);
characterisesRouter.put('/:id', updateOneCharacterises, getOneCharacterisesById);
characterisesRouter.delete('/:id', deleteOneCharacterises);

module.exports = characterisesRouter;
