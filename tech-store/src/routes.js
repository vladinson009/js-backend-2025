import { Router } from 'express';
import homeController from './controllers/homeController.js';
import userController from './controllers/userController.js';

const router = Router();

router.use(homeController);
router.use('/users', userController);

router.use('*', (req, res) => res.render('404'));
export default router;
