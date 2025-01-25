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
movieController.get('/searchBy', async (req, res) => {
  try {
    const filter = req.query;
    const movies = await movieServices.getByCriteria(filter).lean();
    res.render('movie/search', { movies, filter });
  } catch (error) {
    res.redirect('/404');
  }
});

export default movieController;
