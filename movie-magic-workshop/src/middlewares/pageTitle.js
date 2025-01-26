const titles = {
  '/': 'Catalog',
  '/404': '404 Page',
  '/about': 'About',
  '/movies/create': 'Create Movie',
  '/movies/search': 'Search',
  '/cast/create': 'Create Cast',
  '/users/login': 'Login',
  '/users/register': 'Register',
};

export default function pageTitle(req, res, next) {
  const title = titles[req.url];
  if (title) {
    res.locals.pageTitle = title;
  } else if (req.url.includes('/movies/details')) {
    res.locals.pageTitle = 'Movie Details';
  } else if (req.url.includes('/movies/edit')) {
    res.locals.pageTitle = 'Edit Movie';
  } else if (req.url.includes('/cast/attach/')) {
    res.locals.pageTitle = 'Attach Cast';
  }
  next();
}
