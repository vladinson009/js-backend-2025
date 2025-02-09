import { Router } from 'express';
import userService from '../services/userService.js';

const userController = Router();

userController.get('/login', async (req, res) => {
  res.render('user/login');
});

export default userController;
