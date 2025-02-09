import { Router } from 'express';
import userController from './controllers/userController.js';
import homeController from './controllers/homeController.js';
import cosmeticController from './controllers/cosmeticController.js';

const router = Router();

router.use(homeController);
router.use('/users', userController);
router.use('/products', cosmeticController);
router.use('/404', (req, res) => res.render('404'));
router.use('*', (req, res) => res.redirect('/404'));

export default router;
