import { Router } from 'express';
import stoneService from '../services/stoneService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  try {
    const stones = await stoneService.getLastThree().lean();
    res.render('home', { stones });
  } catch (error) {
    res.redirect('/404');
  }
});

export default homeController;
