import express from 'express';
import routes from '../routes.js';
export default function (app) {
  app.use(express.static('public'));
  app.use(routes);
}
