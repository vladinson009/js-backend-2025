import { Router } from 'express';

const userController = Router();

userController.get('/login', (req, res) => {
  res.render('user/login');
});

userController.get('/register', (req, res) => {
  res.render('user/register');
});

export default userController;
