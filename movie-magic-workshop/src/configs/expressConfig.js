import express from 'express';
import routes from '../routes.js';
import pageTitle from '../middlewares/pageTitle.js';
export default function (app) {
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(pageTitle);
  app.use(routes);
}
