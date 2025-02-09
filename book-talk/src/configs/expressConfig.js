import cookieParser from 'cookie-parser';
import express from 'express';
import router from '../router.js';
import cookieMiddleware from '../middlewares/cookieMiddleware.js';

export default function (app) {
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(cookieMiddleware);
  app.use(router);
}
