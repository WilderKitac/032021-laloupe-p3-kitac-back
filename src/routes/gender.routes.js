const genderRouter = require('express').Router();
const { getAllGender, getOneGenderById, createOneGender, updateOneGender, deleteOneGender } = require('../controllers/gender.controller');

genderRouter.get('/', getAllGender);
genderRouter.get('/:id', getOneGenderById);
genderRouter.post('/', createOneGender, getOneGenderById);
genderRouter.put('/:id', updateOneGender, getOneGenderById);
genderRouter.delete('/:id', deleteOneGender);

module.exports = genderRouter;
