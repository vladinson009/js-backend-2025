import { Router } from 'express';
import bookService from '../services/bookService.js';
import errorParser from '../utils/parseError.js';

const bookController = Router();

bookController.get('/catalog', async (req, res) => {
  try {
    const books = await bookService.getAll().lean();
    res.render('book/catalog', { books });
  } catch (error) {
    res.redirect('/404');
  }
});
bookController.get('/create', (req, res) => {
  res.render('book/create');
});
bookController.post('/create', async (req, res) => {
  const userInput = req.body;
  const userId = res.locals?.user._id;
  if (userId) {
    try {
      await bookService.create(userInput, userId);
      res.redirect('/');
    } catch (err) {
      console.log(err.message);

      const error = errorParser(err);
      res.render('book/create', error, userInput);
    }
  }
});
bookController.get('/details/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await bookService.getById(bookId).lean();
    res.render('book/details', { book });
  } catch (error) {
    res.redirect('/404');
  }
});
export default bookController;
