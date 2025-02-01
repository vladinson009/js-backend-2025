import express from 'express';
import routes from '../routes.js';
import pageTitle from '../middlewares/pageTitle.js';
import cookieParser from 'cookie-parser';
import isUser from '../middlewares/isUser.js';

export default function expressConfig(app) {
  app.use('/styles', express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(pageTitle);
  app.use(isUser);
  app.use(routes);
}
