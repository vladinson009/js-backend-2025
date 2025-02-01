import { Router } from 'express';
import userService from '../services/userService.js';
import { guestsOnly, loggedOnly } from '../middlewares/routeGuards.js';

const userController = Router();

userController.get('/login', guestsOnly, (req, res) => {
  res.render('user/login');
});
userController.post('/login', guestsOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.login(userInput);
    res.cookie('jwt', token);
    res.redirect('/');
  } catch (err) {
    const error = err.message;
    res.render('user/login', { userInput, error });
  }
});
userController.get('/register', guestsOnly, (req, res) => {
  res.render('user/register');
});
userController.post('/register', guestsOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const token = await userService.register(userInput);
    res.cookie('jwt', token);
    res.redirect('/');
  } catch (err) {
    const error = err.message;
    res.render('user/register', { userInput, error });
  }
});
userController.get('/logout', loggedOnly, (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});
export default userController;
