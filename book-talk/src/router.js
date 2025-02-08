import { Router } from 'express';
import homeController from './controllers/homeController.js';

const router = Router();

router.use(homeController);

router.use('*', (req, res) => res.render('404'));

export default router;
