import { Router } from 'express';
import homeController from './controllers/homeController.js';
import staticController from './controllers/staticController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castController.js';
const routes = Router();

routes.use(homeController); // * Home page
routes.use(staticController); // * About page
routes.use('/movies', movieController); // * Movie pages
routes.use('/cast', castController); // * Cast pages

routes.use('*', (req, res) => res.redirect('/404'));
export default routes;
