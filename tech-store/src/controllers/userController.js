import { Router } from 'express';
import userService from '../services/userService.js';
import { guestsOnly, loggedOnly } from '../middlewares/routeGuard.js';

const userController = Router();
// ! REGISTER new user
userController.get('/register', guestsOnly, (req, res) => {
  res.render('user/register');
});
userController.post('/register', guestsOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.register(userInput);
    res.cookie('jwt', token);
    res.redirect('/');
  } catch (error) {
    res.render('user/register', { error, userInput });
  }
});

// ! LOGIN existing user
userController.get('/login', guestsOnly, (req, res) => {
  res.render('user/login');
});
userController.post('/login', guestsOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.login(userInput);
    res.cookie('jwt', token);
    res.redirect('/');
  } catch (error) {
    res.render('user/login', { error, userInput });
  }
});
// ! LOGOUT user
userController.get('/logout', loggedOnly, (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});
export default userController;
