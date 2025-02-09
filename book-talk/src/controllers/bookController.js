import { Router } from 'express';
import bookService from '../services/bookService.js';
import errorParser from '../utils/parseError.js';
import { loggedOnly } from '../middlewares/routeGuards.js';

const bookController = Router();

bookController.get('/catalog', async (req, res) => {
  try {
    const books = await bookService.getAll().lean();
    res.render('book/catalog', { books });
  } catch (error) {
    res.redirect('/404');
  }
});
bookController.get('/create', loggedOnly, (req, res) => {
  res.render('book/create');
});
bookController.post('/create', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const userId = res.locals?.user._id;
  if (userId) {
    try {
      await bookService.create(userInput, userId);
      res.redirect('/books/catalog');
    } catch (err) {
      console.log(err.message);

      const error = errorParser(err);
      res.render('book/create', { error, userInput });
    }
  }
});
bookController.get('/details/:bookId', async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await bookService.getById(bookId).lean();
    const isAuthor = book.owner.equals(res.locals.user?._id);

    const isRead = book.wishingList.some((el) => el.equals(res.locals.user?._id));
    res.render('book/details', { book, isAuthor, isRead });
  } catch (error) {
    res.redirect('/404');
  }
});
bookController.get('/wish/:bookId', loggedOnly, async (req, res) => {
  const { bookId } = req.params;
  const userId = res.locals.user._id;
  try {
    const book = await bookService.getById(bookId).select('owner');
    if (book.owner.equals(userId)) {
      return res.redirect('/404');
    }
  } catch (error) {
    return res.redirect('/404');
  }
  try {
    await bookService.addToWishlist(bookId, userId);
    res.redirect(`/books/details/${bookId}`);
  } catch (error) {
    res.redirect('/404');
  }
});
bookController.get('/edit/:bookId', loggedOnly, async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await bookService.getById(bookId).lean();
    if (!book.owner.equals(res.locals.user._id)) {
      return res.redirect('/404');
    }
    res.render('book/edit', { book });
  } catch (error) {
    res.redirect('/404');
  }
});
bookController.post('/edit/:bookId', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const { bookId } = req.params;
  try {
    const book = await bookService.getById(bookId).select('owner').lean();
    if (!book.owner.equals(res.locals.user._id)) {
      return res.redirect('/404');
    }
  } catch (error) {
    return res.redirect('/404');
  }
  try {
    await bookService.editById(bookId, userInput);
    res.redirect(`/books/details/${bookId}`);
  } catch (err) {
    const error = errorParser(err);
    res.render('book/edit', { book: userInput, error });
  }
});
bookController.get('/delete/:bookId', loggedOnly, async (req, res) => {
  const { bookId } = req.params;
  try {
    const book = await bookService.getById(bookId).select('owner').lean();
    if (!book.owner.equals(res.locals.user._id)) {
      return res.redirect('/404');
    }
  } catch (error) {
    return res.redirect('/404');
  }
  try {
    await bookService.deleteById(bookId);
    res.redirect('/books/catalog');
  } catch (err) {
    res.redirect('/404');
  }
});
bookController.get('/profile', loggedOnly, async (req, res) => {
  const userId = res.locals.user?._id;

  const books = await bookService.getWishlist(userId).lean();
  res.render('user/profile', { books });
});
export default bookController;
