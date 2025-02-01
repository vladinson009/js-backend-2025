import cookieParser from 'cookie-parser';
import express from 'express';
import router from '../routes.js';
import pageTitle from '../middlewares/pageTitle.js';
import isUser from '../middlewares/isUser.js';

export default function (app) {
  app.use('/styles', express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(pageTitle);
  app.use(isUser);
  app.use(router);
}
