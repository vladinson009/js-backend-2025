const titles = {
  '/': 'TechStore - Laptops and Computers',
  '/devices/catalog': 'TechStore - Product Catalog',
  '/devices/profile': 'TechStore - Profile',
  '/devices/create': 'TechStore - Create Product',
  '/about': 'TechStore - About Us',
  '/users/login': 'TechStore - Login',
  '/users/register': 'TechStore - Register',
  '/404': 'TechStore - Page Not Found',
};

export default function (req, res, next) {
  const title = titles[req.url];
  if (title) {
    res.locals.pageTitle = title;
  } else if (req.url.includes('/devices/details/')) {
    res.locals.pageTitle = 'TechStore - Laptop Details';
  } else if (req.url.includes('/devices/edit/')) {
    res.locals.pageTitle = 'TechStore - Edit Product';
  }
  next();
}
