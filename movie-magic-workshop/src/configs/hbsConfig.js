import handlebars from 'express-handlebars';

// * handlebars view engine & extension name Setup
export default function (app) {
  app.set('view engine', 'hbs'); // ! set view engine for express
  app.set('views', 'src/views'); // ! set views folder
  app.engine('hbs', handlebars.engine({ extname: 'hbs' })); // ! set hbs engine & extname
}
