import { Router } from 'express';
import recipeService from '../services/recipeService.js';
import { loggedOnly } from '../middlewares/routeGuards.js';

const recipeController = Router();

recipeController.get('/catalog', async (req, res) => {
  try {
    const recipes = await recipeService.getAllRecipes().lean();
    res.render('recipe/catalog', { recipes });
  } catch (error) {
    res.redirect('/404');
  }
});
recipeController.get('/create', loggedOnly, (req, res) => {
  res.render('recipe/create');
});
recipeController.post('/create', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const owner = res.locals.user?._id;
  console.log(owner);

  try {
    await recipeService.createRecipe(userInput, owner);
    res.redirect('/recipes/catalog');
  } catch (error) {
    res.render('recipe/create', { userInput, error });
  }
});
recipeController.get('/details/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const currentUser = res.locals.user?._id;
  try {
    const recipe = await recipeService.getRecipeById(recipeId).lean();
    const ownerId = recipe.owner.toString();
    const isOwner = currentUser == ownerId;
    const isVoted = recipe.recommendList.some((el) => el.toString() == currentUser);
    console.log(recipe.recommendList);

    res.render('recipe/details', { recipe, isOwner, isVoted });
  } catch (error) {
    res.redirect('/404');
  }
});
recipeController.get('/edit/:recipeId', loggedOnly, async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await recipeService.getRecipeById(recipeId).lean();
    if (recipe.owner.toString() != res.locals.user?._id) {
      throw new Error('Not an owner');
    }
    res.render('recipe/edit', { recipe });
  } catch (error) {
    res.redirect('/404');
  }
});
recipeController.post('/edit/:recipeId', loggedOnly, async (req, res) => {
  const { recipeId } = req.params;
  const userInput = req.body;
  try {
    const recipe = await recipeService.getRecipeById(recipeId).lean();
    if (recipe.owner.toString() != res.locals.user?._id) {
      throw new Error('You are not an owner of the recipe!');
    }
    await recipeService.editRecipeById(recipeId, userInput);

    res.redirect(`/recipes/details/${recipeId}`);
  } catch (err) {
    res.render('recipe/edit', { recipe: userInput, error: err.message });
  }
});

recipeController.get('/recommend/:recipeId', loggedOnly, async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipe = await recipeService.getRecipeById(recipeId).lean();
    if (recipe.owner.toString() == res.locals.user._id) {
      res.redirect('/404');
    }
  } catch (error) {
    res.redirect('/404');
  }
  const userId = res.locals.user._id;
  try {
    await recipeService.recommendRecipe(recipeId, userId);
    res.redirect(`/recipes/details/${recipeId}`);
  } catch (error) {
    console.log(error.message);

    res.redirect('/404');
  }
});

recipeController.get('/delete/:recipeId', async (req, res) => {
  const recipeId = req.params.recipeId;
  try {
    const recipe = await recipeService.getRecipeById(recipeId).lean();
    if (recipe.owner.toString() == res.locals.user?._id) {
      await recipeService.deleteById(recipe);
      res.redirect('/recipes/catalog');
    } else {
      res.redirect('/404');
    }
  } catch (error) {
    res.redirect('/404');
  }
});
recipeController.get('/search', async (req, res) => {
  const recipes = await recipeService.getAllRecipes().lean();
  res.render('recipe/search', { recipes });
});
recipeController.get('/search/criteria', async (req, res) => {
  const query = req.query.search;
  try {
    const recipes = await recipeService.searchByCriteria(query).lean();
    res.render('recipe/search', { recipes, query });
  } catch (error) {
    res.redirect('/recipes/search');
  }
});

export default recipeController;
