import { Router } from 'express';
import userController from './controllers/userController.js';
import homeController from './controllers/homeController.js';
import disasterController from './controllers/disasterController.js';

const router = Router();

router.use(homeController);
router.use('/users', userController);
router.use('/disasters', disasterController);
router.use('/404', (req, res) => res.render('404'));
router.use('*', (req, res) => res.redirect('/404'));

export default router;
