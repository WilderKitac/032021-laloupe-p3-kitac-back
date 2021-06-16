const mainRouter = require('express').Router();
const usersRoutes = require('./users.routes');
const imagesRoutes = require('./productsImages.routes');
const representsRoutes = require('./represents.routes');
const characterisesRoutes = require('./characterises.routes');

mainRouter.use('/users', usersRoutes);
mainRouter.use('/productsimages', imagesRoutes);
mainRouter.use('/represents', representsRoutes);
mainRouter.use('/characterises', characterisesRoutes);

module.exports = mainRouter;
