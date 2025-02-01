import handlebars from 'express-handlebars';

export default function hbsConfig(app) {
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
}
