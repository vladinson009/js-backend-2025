import { Router } from 'express';
import { loggedOnly } from '../middlewares/routesGuards.js';
import createSelectOptions from '../utils/createSelectOptions.js';
import disasterService from '../services/disasterService.js';
import errorParser from '../utils/errorParser.js';

const disasterController = Router();

disasterController.get('/catalog', async (req, res) => {
  try {
    const disasters = await disasterService.getAll().lean();
    res.render('disaster/catalog', { disasters });
  } catch (err) {
    res.redirect('/404');
  }
});
disasterController.get('/create', loggedOnly, async (req, res) => {
  const options = createSelectOptions();
  res.render('disaster/create', { options });
});
disasterController.post('/create', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const userId = res.locals.user?._id;
  try {
    await disasterService.create(userInput, userId);
    res.redirect('/disasters/catalog');
  } catch (err) {
    const options = createSelectOptions(userInput.type);
    const error = errorParser(err);
    res.render('disaster/create', { options, userInput, error });
  }
});
disasterController.get('/details/:disasterId', async (req, res) => {
  const { disasterId } = req.params;
  try {
    const disaster = await disasterService.getById(disasterId).lean();
    const userId = res.locals.user?._id;
    const isOwner = disaster.owner.equals(userId);
    const isInterested = disaster.interestedList.some(
      (el) => el.toString() == userId
    );
    console.log(isInterested);

    res.render('disaster/details', { disaster, isOwner, isInterested });
  } catch (error) {
    console.log(error.message);
    res.redirect('/404');
  }
});
disasterController.get('/edit/:disasterId', loggedOnly, async (req, res) => {
  const { disasterId } = req.params;
  const userId = res.locals.user?._id;
  try {
    const disaster = await disasterService.getById(disasterId).lean();
    if (disaster.owner.toString() != userId) {
      return res.redirect('/404');
    }
    const options = createSelectOptions(disaster.type);
    res.render('disaster/edit', { disaster, options });
  } catch (error) {
    res.redirect('/404');
  }
});
disasterController.post('/edit/:disasterId', loggedOnly, async (req, res) => {
  const { disasterId } = req.params;
  const userInput = req.body;
  const userId = res.locals.user?._id;
  try {
    const disaster = await disasterService.getById(disasterId).lean();
    if (disaster.owner.toString() != userId) {
      return res.redirect('/404');
    }
    await disasterService.editById(disasterId, userInput);
    res.redirect(`/disasters/details/${disasterId}`);
  } catch (err) {
    const options = createSelectOptions(userInput.type);
    const error = errorParser(err);
    res.render('disaster/edit', { error, disaster: userInput, options });
  }
});
disasterController.get('/delete/:disasterId', loggedOnly, async (req, res) => {
  const { disasterId } = req.params;
  const userId = res.locals.user?._id;
  try {
    const disaster = await disasterService.getById(disasterId).lean();
    if (disaster.owner.toString() != userId) {
      return res.redirect('/404');
    }
    await disasterService.deleteById(disasterId);
    res.redirect('/disasters/catalog');
  } catch (error) {
    res.redirect('/404');
  }
});
disasterController.get('/search', async (req, res) => {
  try {
    const disasters = await disasterService.getAll().lean();
    const options = createSelectOptions();
    res.render('disaster/search', { options, disasters });
  } catch (error) {
    res.redirect('/404');
  }
});
disasterController.get('/search/criteria', async (req, res) => {
  const includes = req.query;
  try {
    const disasters = await disasterService.getAll(includes).lean();
    const options = createSelectOptions(includes.type);
    res.render('disaster/search', { options, disasters, includes });
  } catch (error) {
    res.redirect('/404');
  }
});
disasterController.get('/interested/:disasterId', loggedOnly, async (req, res) => {
  const { disasterId } = req.params;
  const userId = res.locals.user?._id;

  try {
    if (userId) {
      await disasterService.interestedIn(disasterId, userId);
      res.redirect(`/disasters/details/${disasterId}`);
    }
  } catch (err) {
    const disaster = await disasterService.getById(disasterId).lean();
    const error = errorParser(err);
    res.render('disaster/details', { disaster, error });
  }
});
export default disasterController;
