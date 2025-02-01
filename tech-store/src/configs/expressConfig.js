import cookieParser from 'cookie-parser';
import express from 'express';
import router from '../routes.js';

export default function (app) {
  //!TODO: app.use('/static', express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(router);
}
