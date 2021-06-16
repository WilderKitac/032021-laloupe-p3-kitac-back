const suppliesRouter = require('express').Router();
const { getAllSupplies, getOneSuppliesById, createOneSupplies, updateOneSupplies, deleteOneSupplies } = require('../controllers/supplies.controller');

suppliesRouter.get('/', getAllSupplies);
suppliesRouter.get('/:id', getOneSuppliesById);
suppliesRouter.post('/', createOneSupplies, getOneSuppliesById);
suppliesRouter.put('/:id', updateOneSupplies, getOneSuppliesById);
suppliesRouter.delete('/:id', deleteOneSupplies);

module.exports = suppliesRouter;
