import hbs from 'express-handlebars';

// ! handlebars view engine & extension name Setup
export default async function (app) {
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
  app.engine('hbs', hbs.engine({ extname: false }));
}
