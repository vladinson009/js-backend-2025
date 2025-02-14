import { Router } from 'express';
import stoneService from '../services/stoneService.js';
import errorParser from '../utils/errorParser.js';
import { loggedOnly } from '../middlewares/routesGuards.js';

const stoneController = Router();

stoneController.get('/dashboard', async (req, res) => {
  const stones = await stoneService.getAll().lean();
  res.render('stone/dashboard', { stones });
});
stoneController.get('/search', (req, res) => {
  res.render('stone/search');
});
stoneController.get('/add', loggedOnly, (req, res) => {
  res.render('stone/create');
});
stoneController.post('/add', loggedOnly, async (req, res) => {
  const userInput = req.body;
  if (res.locals?.user == undefined) {
    throw new Error('Not valid user');
  }
  try {
    const owner = res.locals.user._id;
    await stoneService.create(userInput, owner);
    res.redirect('/stones/dashboard');
  } catch (err) {
    const error = errorParser(err);
    res.render('stone/create', { userInput, error });
  }
});
stoneController.get('/details/:stoneId', async (req, res) => {
  const { stoneId } = req.params;
  try {
    const stone = await stoneService.getById(stoneId).lean();
    res.render('stone/details', { stone });
  } catch (error) {
    res.redirect('/404');
  }
});
export default stoneController;
