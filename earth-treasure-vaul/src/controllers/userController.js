import { Router } from 'express';
import userService from '../services/userService.js';
import errorParser from '../utils/errorParser.js';
import { AUTH_COOKIE_NAME } from '../constants.js';

const userController = Router();
// ! LOGIN
userController.get('/login', (req, res) => {
  res.render('user/login');
});
userController.post('/login', async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.login(userInput);
    res.cookie(AUTH_COOKIE_NAME, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/login', { userInput, error });
  }
});
// ! REGISTER
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
    res.render('user/register', { userInput, error });
  }
});
export default userController;
