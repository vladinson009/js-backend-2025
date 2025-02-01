const titles = {
  '/': 'Home Cooking Recipes',
  '/users/login': 'Login - Home Cooking Recipes',
  '/users/register': 'Register - Home Cooking Recipes',
  '/404': 'Page Not Found - Home Cooking Recipes',
  '/recipes/catalog': 'Recipe Catalog - Home Cooking Recipes',
  '/recipes/create': 'Create Recipe - Home Cooking Recipes',
  '/recipes/search': 'Search Recipes - Home Cooking Recipes',
};

export default function pageTitle(req, res, next) {
  const title = titles[req.url];
  if (title) {
    res.locals.pageTitle = title;
  } else if (req.url.includes('/recipes/details/')) {
    res.locals.pageTitle = `${res.locals.recipePageTitle} - Home Cooking Recipes`;
  } else if (req.url.includes('/recipes/edit/')) {
    res.locals.pageTitle = 'Edit Recipe - Home Cooking Recipes';
  }
  next();
}
