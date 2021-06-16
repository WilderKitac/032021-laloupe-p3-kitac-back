const represents = require('express').Router();
const {
  getAllRepresents,
  getOneRepresentsById,
  createOneRepresents,
  updateOneRepresents,
  deleteOneRepresents,
} = require('../controllers/represents.controller');

represents.get('/', getAllRepresents);
represents.get('/:id', getOneRepresentsById);
represents.post('/', createOneRepresents, getOneRepresentsById);
represents.put('/:id', updateOneRepresents, getOneRepresentsById);
represents.delete('/:id', deleteOneRepresents);

module.exports = represents;
