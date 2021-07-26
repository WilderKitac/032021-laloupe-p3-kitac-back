const madesOfRouter = require('express').Router();
const { getAllMadesOf, getOneMadesOfById, createOneMadesOf, updateOneMadesOf, deleteOneMadesOf } = require('../controllers/madesOf.controller');

madesOfRouter.get('/', getAllMadesOf);
madesOfRouter.get('/:id', getOneMadesOfById);
madesOfRouter.post('/', createOneMadesOf, getOneMadesOfById);
madesOfRouter.put('/:id', updateOneMadesOf, getOneMadesOfById);
madesOfRouter.delete('/:id', deleteOneMadesOf);

module.exports = madesOfRouter;
