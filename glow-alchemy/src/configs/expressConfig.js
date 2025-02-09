import express from 'express';
import router from '../router.js';
import cookieParser from 'cookie-parser';
import validateCookie from '../middlewares/validateCookie.js';
export default function (app) {
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(validateCookie);
  app.use(router);
}
