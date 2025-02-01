import { Router } from 'express';
import movieServices from '../services/movieServices.js';
import errorParser from '../utils/customErrorHandler.js';
import createSelectOptions from '../utils/createSelectOptions.js';

const movieController = Router();

const categories = {
  'tv-show': 'TV Show',
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
  const creatorId = res.locals.user ? res.locals.user._id : null;
  try {
    await movieServices.createMovie(formData, creatorId);
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
    const currentUserId = res.locals.user ? res.locals.user._id : null;
    const movie = await movieServices.getById(movieId).populate('casts.cast').lean();
    movie.rating = '★'.repeat(Math.floor(movie.rating / 2));
    const isCreator = movie.creatorId?.toString() == currentUserId;
    res.render('movie/details', { movie, isCreator });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! movie EDIT get request
movieController.get('/edit/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const movie = await movieServices.getById(movieId).lean();
    const options = createSelectOptions(categories, movie.category);

    res.render('movie/edit', { movie, options });
  } catch (error) {
    res.redirect('/404');
  }
});
// ! movie EDIT post request
movieController.post('/edit/:movieId', async (req, res) => {
  const formData = req.body;
  const { movieId } = req.params;
  try {
    await movieServices.editMovie(formData, movieId);
    res.redirect(`/movies/details/${movieId}`);
  } catch (err) {
    // * nested try-catch statement to keep the state
    try {
      const movie = await movieServices.getById(movieId).lean();
      const options = createSelectOptions(categories, movie.category);
      const error = errorParser(err);
      res.render('movie/edit', { movie, options, error });
    } catch (fetchError) {
      res.redirect('/404');
    }
  }
});
// ! movie DELETE get request
movieController.get('/delete/:movieId', async (req, res) => {
  const movieId = req.params.movieId;
  try {
    await movieServices.deleteMovie(movieId);
    res.redirect('/');
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
