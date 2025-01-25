const titles = {
  '/': 'Catalog Page',
  '/404': '404 Page',
  '/about': 'About Page',
  '/movies/create': 'Create Page',
  '/movies/details': 'Details Page',
  '/search': 'Search Page',
};

export default function pageTitle(req, res, next) {
  const title = titles[req.url];
  if (title) {
    res.locals.pageTitle = title;
  } else if (req.url.includes('/movies/details')) {
    res.locals.pageTitle = titles['/movies/details'];
  }
  next();
}
