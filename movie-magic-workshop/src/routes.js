import { Router } from 'express';
import homeController from './controllers/homeController.js';
import staticController from './controllers/staticController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';
import userController from './controllers/userController.js';
const routes = Router();
// TODO: Create Routes protection
routes.use(homeController); // * Home page
routes.use(staticController); // * About page
routes.use('/movies', movieController); // * Movie pages
routes.use('/cast', castController); // * Cast pages
routes.use('/users', userController); // * User Pages
routes.use('*', (req, res) => res.redirect('/404'));
export default routes;
