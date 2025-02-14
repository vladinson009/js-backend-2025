import { Router } from 'express';

const stoneController = Router();

stoneController.get('/dashboard', async (req, res) => {
  //TODO: fetch data
  res.render('stone/dashboard');
});
stoneController.get('/search', (req, res) => {
  res.render('stone/search');
});
stoneController.get('/create', (req, res) => {
  res.render('create');
});
export default stoneController;
