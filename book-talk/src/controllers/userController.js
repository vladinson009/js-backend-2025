import { Router } from 'express';
import userService from '../services/userService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import errorParser from '../utils/parseError.js';
import { guestsOnly, loggedOnly } from '../middlewares/routeGuards.js';

const userController = Router();

userController.get('/login', guestsOnly, (req, res) => {
  res.render('user/login');
});
userController.post('/login', guestsOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userService.login(userInput);
    res.cookie(AUTH_COOKIE_NAME, user);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/login', { error, userInput });
  }
});

userController.get('/register', guestsOnly, (req, res) => {
  res.render('user/register');
});
userController.post('/register', guestsOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userService.register(userInput);
    res.cookie(AUTH_COOKIE_NAME, user);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/register', { error, userInput });
  }
});

userController.get('/logout', loggedOnly, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect('/');
});

export default userController;
