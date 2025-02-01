import jwt from 'jsonwebtoken';
import { JWT_SECRET_WORD } from '../constants.js';

function loggedUsersOnly(req, res, next) {
  try {
    jwt.verify(req.cookies.jwt, JWT_SECRET_WORD);
    next();
  } catch (error) {
    res.redirect('/users/login');
  }
}

function authorizedUsersOnly(req, res, next) {
  try {
    const token = jwt.verify(req.cookies.jwt, JWT_SECRET_WORD);
    req.userId = token._id;
    next();
  } catch (error) {
    res.redirect('/404');
  }
}

function guestUsersOnly(req, res, next) {
  if (req.cookies.jwt) {
    res.redirect('/');
  }
  next();
}

export { loggedUsersOnly, authorizedUsersOnly, guestUsersOnly };
