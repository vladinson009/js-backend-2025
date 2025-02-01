import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../constants.js';

export default function (req, res, next) {
  const cookie = req.cookies.jwt;

  if (cookie) {
    try {
      const user = jwt.verify(cookie, SECRET_TOKEN);
      res.locals.user = user;
    } catch (error) {
      res.clearCookie('jwt');
    }
  }
  next();
}
