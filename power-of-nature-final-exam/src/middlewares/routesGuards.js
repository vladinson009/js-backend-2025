export function loggedOnly(req, res, next) {
  if (!res.locals.user) {
    return res.redirect('/404');
  }
  next();
}
export function guestOnly(req, res, next) {
  if (res.locals.user) {
    return res.redirect('/404');
  }
  next();
}
