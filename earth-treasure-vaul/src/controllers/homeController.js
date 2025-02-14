import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res) => {
  // TODO: fetch last three
  res.render('home');
});

export default homeController;
