export function loggedOnly(req, res, next) {
  if (!res.locals.user) {
    return res.redirect('/');
  }
  next();
}
export function guestsOnly(req, res, next) {
  if (res.locals.user) {
    return res.redirect('/');
  }
  next();
}
