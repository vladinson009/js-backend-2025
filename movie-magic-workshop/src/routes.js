import { Router } from 'express';
import homeController from './controllers/homeController.js';
import aboutController from './controllers/aboutController.js';
import movieController from './controllers/movieController.js';
const routes = Router();

routes.use(homeController); // * Home page
routes.use(aboutController); // * About page
routes.use('/movies', movieController); // * Movie pages

routes.use('*', (req, res) => res.render('404'));
export default routes;
