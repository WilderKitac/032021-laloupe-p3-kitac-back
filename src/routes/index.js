const mainRouter = require('express').Router();
const usersRoutes = require('./users.routes');

mainRouter.use('/users', usersRoutes);

module.exports = mainRouter;
