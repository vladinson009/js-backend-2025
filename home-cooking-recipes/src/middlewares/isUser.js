import jsonwebtoken from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';

export default function isUser(req, res, next) {
  if (req.cookies.jwt) {
    try {
      const user = jsonwebtoken.verify(req.cookies.jwt, JWT_SECRET);
      res.locals.user = user;
    } catch (error) {
      res.clearCookie('jwt');
    }
  }
  next();
}
