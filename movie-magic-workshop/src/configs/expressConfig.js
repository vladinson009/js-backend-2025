import express from 'express';
import routes from '../routes.js';
import pageTitle from '../middlewares/pageTitle.js';
import cookieParser from 'cookie-parser';
// * middlewares for following functionality
export default function (app) {
  app.use(express.static('public')); // ! load static files
  app.use(express.urlencoded({ extended: false })); // ! req.body(POST) || req.query(GET)
  app.use(cookieParser()); // ! req.cookies
  app.use(pageTitle); // ! dynamic changes of page title
  app.use(routes); // ! main router for url
}
