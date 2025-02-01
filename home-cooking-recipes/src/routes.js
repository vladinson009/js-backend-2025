import { Router } from 'express';
import homeController from './controllers/homeController.js';
import recipeController from './controllers/recipeController.js';
import userController from './controllers/userController.js';

const routes = Router();
routes.use(homeController);
routes.use('/recipes', recipeController);
routes.use('/users', userController);

routes.use('*', (req, res) => res.render('404'));
export default routes;
