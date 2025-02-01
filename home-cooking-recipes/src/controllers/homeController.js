import { Router } from 'express';
import recipeService from '../services/recipeService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  try {
    const lastThreeRecipes = await recipeService.getLastThree().lean();
    res.render('home', { recipes: lastThreeRecipes });
  } catch (error) {
    res.render('home');
  }
});

export default homeController;
