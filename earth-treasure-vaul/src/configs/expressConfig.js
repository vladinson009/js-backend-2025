import express from 'express';
import router from '../router.js';
import validateCookie from '../middlewares/validateCookie.js';
import cookieParser from 'cookie-parser';

export default function (app) {
  app.use('/static', express.static('static'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(validateCookie);
  app.use(router);
}
