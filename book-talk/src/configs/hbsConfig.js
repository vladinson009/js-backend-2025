import handlebars from 'express-handlebars';

export default function (app) {
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
  app.engine(
    'hbs',
    handlebars.engine({
      extname: 'hbs',
      helpers: {
        setTitle(title) {
          this.pageTitle = title;
        },
      },
    })
  );
}
