import express from 'express';
import routes from '../routes.js';

export default function expressConfig(app) {
  app.use('/styles', express.static('public'));

  app.use(routes);
}
