import { Router } from 'express';

const staticController = Router();

staticController.get('/about', (req, res) => res.render('about'));
staticController.get('/404', (req, res) => res.render('404'));
export default staticController;
