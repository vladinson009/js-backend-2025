import { Router } from 'express';
import movieServices from '../services/movieServices.js';

const movieController = Router();
// ! create movie get request
movieController.get('/create', (req, res) => {
  res.render('movie/create');
});
// ! create movie post request
movieController.post('/create', async (req, res) => {
  const formData = req.body;
  try {
    await movieServices.createMovie(formData);
    res.redirect('/');
  } catch (error) {
    res.render('movie/create', { formData, error: error.message });
  }
});
// ! movie detais get request
movieController.get('/details/:movieId', (req, res) => {
  res.render('movie/details');
});
movieController.get('/search', async (req, res) => {
  try {
    const movies = await movieServices.getAll().lean();
    res.render('movie/search', { movies });
  } catch (error) {}
});

export default movieController;
