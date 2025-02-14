import { AUTH_COOKIE_NAME, JWT_SECRET } from '../constants.js';
import { verify } from '../utils/asyncJwt.js';

export default async function (req, res, next) {
  if (req.cookies[AUTH_COOKIE_NAME]) {
    try {
      const user = await verify(req.cookies[AUTH_COOKIE_NAME], JWT_SECRET);
      res.locals.user = user;
    } catch (error) {
      res.clearCookie(AUTH_COOKIE_NAME);
    }
  }
  next();
}
