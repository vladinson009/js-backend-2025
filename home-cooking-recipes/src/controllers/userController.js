import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.get('/login', (req, res) => {
  res.render('user/login');
});
userController.post('/login', async (req, res) => {
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
userController.get('/register', (req, res) => {
  res.render('user/register');
});
userController.post('/register', async (req, res) => {
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
export default userController;
