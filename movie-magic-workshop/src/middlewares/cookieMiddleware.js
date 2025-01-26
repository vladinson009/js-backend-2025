import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET_WORD } from '../constants.js';

export default function cookieMiddleware(req, res, next) {
  if (req.cookies.jwt) {
    try {
      const user = jsonwebtoken.verify(req.cookies.jwt, JWT_SECRET_WORD);
      res.locals.user = user;
    } catch (error) {
      res.clearCookie('jwt');
    }
  }
  next();
}
