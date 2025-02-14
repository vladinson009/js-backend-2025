import { Router } from 'express';

const userController = Router();

userController.get('/login', () => {
  res.render('user/login');
});

export default userController;
