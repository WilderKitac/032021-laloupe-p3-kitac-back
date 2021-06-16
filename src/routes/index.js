const mainRouter = require('express').Router();
const usersRoutes = require('./users.routes');
const categoryRoutes = require('./category.routes');
const suppliesRoutes = require('./supplies.routes');
const sizeRoutes = require('./size.routes');
const materialsRoutes = require('./materials.routes');
const genderRoutes = require('./gender.routes');
const madesOfRoutes = require('./madesOf.routes')

mainRouter.use('/users', usersRoutes);
mainRouter.use('/categories', categoryRoutes);
mainRouter.use('/supplies', suppliesRoutes);
mainRouter.use('/size', sizeRoutes)
mainRouter.use('/materials', materialsRoutes)
mainRouter.use('/gender', genderRoutes)
mainRouter.use('/madesOf', madesOfRoutes)

module.exports = mainRouter;
