const titles = {
  '/': 'Catalog Page',
  '/404': '404 Page',
  '/about': 'About Page',
  '/movies/create': 'Create Movie',
  '/movies/details': 'Movie Details',
  '/movies/search': 'Search Page',
  '/cast/attach': 'Attach Cast Page',
  '/cast/create': 'Create Cast Page',
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
