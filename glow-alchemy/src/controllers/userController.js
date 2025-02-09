import { Router } from 'express';
import userService from '../services/userService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import errorParser from '../utils/errorParser.js';

const userController = Router();

userController.get('/login', async (req, res) => {
  res.render('user/login');
});
userController.post('/login', async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.login(userInput);
    res.cookie(AUTH_COOKIE_NAME, token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/login', { error, userInput });
  }
});
userController.get('/register', (req, res) => {
  res.render('user/register');
});
userController.post('/register', async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.register(userInput);
    res.cookie(AUTH_COOKIE_NAME, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/register', { error, userInput });
  }
});
export default userController;
