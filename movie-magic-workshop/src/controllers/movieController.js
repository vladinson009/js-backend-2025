import { Router } from 'express';
import movieServices from '../services/movieServices.js';
import errorParser from '../utils/customErrorHandler.js';
import createSelectOptions from '../utils/createSelectOptions.js';

const movieController = Router();

const categories = {
  animation: 'Animation',
  movie: 'Movie',
  documentary: 'Documentary',
  'short-film': 'Short Film',
};
// ! create movie get request
movieController.get('/create', (req, res) => {
  const options = createSelectOptions(categories);
  res.render('movie/create', { options });
});
// ! create movie post request
movieController.post('/create', async (req, res) => {
  const formData = req.body;
  try {
    await movieServices.createMovie(formData);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    const options = createSelectOptions(categories, formData.category);
    res.render('movie/create', { formData, error, options });
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
