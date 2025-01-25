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
    const [movie, cast] = await Promise.all([
      movieServices.getById(movieId).lean(),
      castServices.fetchCast(movieId).lean(),
    ]);

    // const movie = await movieServices.getById(movieId).lean();
    // const cast = await castServices.fetchCast(movieId).lean();
    res.render('cast/attach', { movie, cast });
  } catch (error) {
    console.log(error.message);
    res.redirect('/404');
  }
});
castController.post('/attach/:movieId', async (req, res, next) => {
  const { movieId } = req.params;
  const formData = req.body;

  try {
    await Promise.all([
      movieServices.attachCast(movieId, formData),
      castServices.addMovie(formData.cast, movieId),
    ]);
    res.redirect(`/movies/details/${movieId}`);
  } catch (error) {
    const [movie, cast] = await Promise.all([
      movieServices.getById(movieId).lean(),
      castServices.fetchCast(movieId).lean(),
    ]);

    res.render('cast/attach', { movie, cast, error: error.message });
  }
});

export default castController;
