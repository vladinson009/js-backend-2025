import { Router } from 'express';
import movieServices from '../services/movieServices.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  try {
    const movies = await movieServices.getAll().lean();
    res.render('home', { movies });
  } catch (error) {
    res.render('home', { movies: [] });
  }
});

export default homeController;
