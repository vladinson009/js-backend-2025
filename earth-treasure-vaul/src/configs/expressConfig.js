import express from 'express';
import router from '../router.js';

export default function (app) {
  app.use('/static', express.static('static'));
  app.use(router);
}
