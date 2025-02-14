import { Router } from 'express';
import homeController from './controllers/homeController.js';
import userController from './controllers/userController.js';

const router = Router();

router.use(homeController);
router.use('/users', userController);

router.use('/404', (req, res) => res.render('404'));
router.use('*', (req, res) => {
  res.redirect('/404');
});

export default router;
