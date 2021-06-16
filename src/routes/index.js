const mainRouter = require('express').Router();
const usersRoutes = require('./users.routes');
const userTypesRoutes = require('./userTypes.routes');
const productsRoutes = require('./products.routes');

mainRouter.use('/users', usersRoutes);
mainRouter.use('/userTypes', userTypesRoutes);
mainRouter.use('/products', productsRoutes);

module.exports = mainRouter;
