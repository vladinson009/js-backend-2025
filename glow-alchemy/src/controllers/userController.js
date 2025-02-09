import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.get('/login', async (req, res) => {
  res.render('user/login');
});
userController.get('/register', (req, res) => {
  res.render('user/register');
});
export default userController;
