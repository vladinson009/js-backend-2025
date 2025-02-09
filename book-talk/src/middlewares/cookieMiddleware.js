import { AUTH_COOKIE_NAME, JWT_SECRET } from '../constants.js';
import jwt from 'jsonwebtoken';
export default function (req, res, next) {
  const authCookie = req.cookies[AUTH_COOKIE_NAME];
  if (authCookie) {
    try {
      const user = jwt.verify(authCookie, JWT_SECRET);
      res.locals.user = user;
    } catch (error) {
      res.clearCookie(AUTH_COOKIE_NAME);
      res.redirect('/');
    }
  }
  next();
}
