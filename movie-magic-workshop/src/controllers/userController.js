import { Router } from 'express';
import userServices from '../services/userServices.js';
import errorParser from '../utils/customErrorHandler.js';
import createToken from '../utils/createJwt.js';
import { guestUsersOnly, loggedUsersOnly } from '../middlewares/routeGuards.js';

const userController = Router();

// Login Form
userController.get('/login', guestUsersOnly, (req, res) => {
  res.render('user/login');
});
userController.post('/login', guestUsersOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userServices.login(userInput);
    const token = createToken(user);
    res.cookie('jwt', token);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/login', { email: userInput.email, error });
  }
});

// Register Form
userController.get('/register', guestUsersOnly, (req, res) => {
  res.render('user/register');
});
userController.post('/register', guestUsersOnly, async (req, res) => {
  const userInput = req.body;
  try {
    const user = await userServices.register(userInput);
    const token = createToken(user);
    res.cookie('jwt', token);
    res.redirect('/');
  } catch (err) {
    const error = errorParser(err);
    res.render('user/register', { email: userInput.email, error });
  }
});
// Logout
userController.get('/logout', loggedUsersOnly, (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

export default userController;
