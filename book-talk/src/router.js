import { Router } from 'express';
import homeController from './controllers/homeController.js';
import userController from './controllers/userController.js';
import bookController from './controllers/bookController.js';

const router = Router();

router.use(homeController);
router.use('/users', userController);
router.use('/books', bookController);
router.use('/404', (req, res) => res.render('404'));
router.use('*', (req, res) => res.redirect('/404'));

export default router;
