import cookieParser from 'cookie-parser';
import express from 'express';
import router from '../router.js';

export default function (app) {
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(router);
}
