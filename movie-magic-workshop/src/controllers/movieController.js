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
// ! CREATE movie get request
movieController.get('/create', (req, res) => {
  const options = createSelectOptions(categories);
  res.render('movie/create', { options });
});
// ! CREATE movie post request
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
// ! movie DETAILS get request
movieController.get('/details/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await movieServices.getById(movieId).populate('casts.cast').lean();
    movie.rating = '★'.repeat(Math.floor(movie.rating / 2));
    res.render('movie/details', { movie });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! movie EDIT get request
movieController.get('/edit/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await movieServices.getById(movieId).lean();
    console.log(movie);

    const options = createSelectOptions(categories, movie.category);
    res.render('movie/edit', { movie, options });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! movie SEARCH get request
movieController.get('/search', async (req, res) => {
  try {
    const movies = await movieServices.getAll().lean();
    res.render('movie/search', { movies });
  } catch (error) {}
});
// ! movie SEARCH with criteria get request
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
