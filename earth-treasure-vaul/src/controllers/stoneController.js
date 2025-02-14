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
    const userId = res.locals.user?._id;
    const isOwner = stone.owner.equals(userId);
    const isLiked = stone.likedList.some((el) => el.equals(userId));

    res.render('stone/details', { stone, isOwner, isLiked });
  } catch (error) {
    res.redirect('/404');
  }
});
stoneController.get('/edit/:stoneId', async (req, res) => {
  const { stoneId } = req.params;
  try {
    const stone = await stoneService.getById(stoneId).lean();
    res.render('stone/edit', { stone });
  } catch (error) {
    res.redirect('/404');
  }
});
stoneController.post('/edit/:stoneId', async (req, res) => {
  const { stoneId } = req.params;
  const userInput = req.body;
  try {
    await stoneService.updateById(stoneId, userInput);
    res.redirect(`/stones/details/${stoneId}`);
  } catch (err) {
    const error = errorParser(err);
    res.render('stone/edit', { stone: userInput, error });
  }
  //TODO: redirect details page
  //TODO: in case of error persist userInput in fields
});
export default stoneController;
