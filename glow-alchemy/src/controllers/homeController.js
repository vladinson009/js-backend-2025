import { Router } from 'express';
import cosmeticService from '../services/cosmeticService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  try {
    const products = await cosmeticService.getLastThree().lean();
    res.render('home', { products });
  } catch (error) {
    res.redirect('/404');
  }
});
export default homeController;
