const mainRouter = require('express').Router();
const usersRoutes = require('./users.routes');
const imagesRoutes = require('./productsImages.routes');

mainRouter.use('/users', usersRoutes);
mainRouter.use('/productsimages', imagesRoutes);

module.exports = mainRouter;
