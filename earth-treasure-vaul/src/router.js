import { Router } from 'express';
import homeController from './controllers/homeController';
import userController from './controllers/userController';

const router = Router();

router.use(homeController);
router.use('/users', userController);

router.use('/404', (req, res) => res.render('404'));
router.use('*', (req, res) => {
  res.redirect('/404');
});

export default router;
