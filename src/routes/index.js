const mainRouter = require('express').Router();
const usersRoutes = require('./users.routes');
const userTypesRoutes = require('./userTypes.routes');
const productsRoutes = require('./products.routes');

mainRouter.use('/users', usersRoutes);
mainRouter.use('/userTypes', userTypesRoutes);
mainRouter.use('/products', productsRoutes);
const categoryRoutes = require('./category.routes');
const suppliesRoutes = require('./supplies.routes');
const sizeRoutes = require('./size.routes');

mainRouter.use('/users', usersRoutes);
mainRouter.use('/categories', categoryRoutes);
mainRouter.use('/supplies', suppliesRoutes);
mainRouter.use('/size', sizeRoutes)

module.exports = mainRouter;
