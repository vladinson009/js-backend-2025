import { Router } from 'express';
import movieServices from '../services/movieServices.js';
import castServices from '../services/castServices.js';

const castController = Router();

castController.get('/create', (req, res) => {
  res.render('cast/create');
});
castController.post('/create', async (req, res) => {
  const userInput = req.body;
  try {
    const cast = await castServices.create(userInput);
    res.redirect('/');
  } catch (error) {
    res.redirect('/404');
  }
});
castController.get('/attach/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await movieServices.getById(movieId).lean();
    res.render('cast/attach', { movie });
  } catch (error) {
    res.redirect('/404');
  }
});

export default castController;
