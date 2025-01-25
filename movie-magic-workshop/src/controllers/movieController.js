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
movieController.get('/details/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await movieServices.getById(movieId).lean();
    movie.rating = '★'.repeat(Math.floor(movie.rating / 2));
    res.render('movie/details', { movie });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! movie search get request
movieController.get('/search', async (req, res) => {
  try {
    const movies = await movieServices.getAll().lean();
    res.render('movie/search', { movies });
  } catch (error) {}
});
// ! movie search with criteria get request
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
