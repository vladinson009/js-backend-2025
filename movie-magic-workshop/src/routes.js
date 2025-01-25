import { Router } from 'express';
import homeController from './controllers/homeController.js';
import aboutController from './controllers/aboutController.js';
const routes = Router();

routes.use(homeController); // * Home page;
routes.use(aboutController); // * About page;

routes.use('*', (req, res) => res.render('404'));
export default routes;
