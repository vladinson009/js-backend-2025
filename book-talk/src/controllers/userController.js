import { Router } from 'express';
import userService from '../services/userService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import errorParser from '../utils/parseError.js';

const userController = Router();

userController.get('/login', (req, res) => {
  res.render('user/login');
});
userController.post('/login', async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userService.login(userInput);
    res.cookie(AUTH_COOKIE_NAME, user);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/register', { error, userInput });
  }
});

userController.get('/register', (req, res) => {
  res.render('user/register');
});
userController.post('/register', async (req, res) => {
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

userController.get('/logout', (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect('/');
});

export default userController;
