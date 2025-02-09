import { Router } from 'express';
import bookService from '../services/bookService.js';
import errorParser from '../utils/parseError.js';

const bookController = Router();

bookController.get('/catalog', (req, res) => {
  res.render('book/catalog');
});
bookController.get('/create', (req, res) => {
  res.render('book/create');
});
bookController.post('create', async (req, res) => {
  const userInput = req.body;
  const userId = res.locals?._id;
  if (userId) {
    try {
      await bookService.create(userInput);
      res.redirect('/');
    } catch (err) {
      const error = errorParser(err);
      res.render('book/create', error, userInput);
    }
  }
});
export default bookController;
