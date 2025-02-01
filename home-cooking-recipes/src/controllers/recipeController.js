import { Router } from 'express';

const recipeController = Router();

recipeController.get('/catalog', (req, res) => {
  res.render('recipe/catalog');
});
recipeController.get('/create', (req, res) => {
  res.render('recipe/create');
});
recipeController.get('/details/:recipeId', (req, res) => {
  res.render('recipe/details');
});
recipeController.get('/edit/:recipeId', (req, res) => {
  res.render('recipe/edit');
});
recipeController.get('/search', (req, res) => {
  res.render('recipe/search');
});

export default recipeController;
