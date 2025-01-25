import { Router } from 'express';

const movieController = Router();

movieController.get('/create', (req, res) => {
  res.render('movie/create');
});
//TODO post request to /create

movieController.get('/details/:movieId', (req, res) => {
  res.render('movie/details');
});

export default movieController;
