function guestsOnly(req, res, next) {
  if (res.locals.user) {
    return res.redirect('/404');
  }
  next();
}
function loggedOnly(req, res, next) {
  if (!res.locals.user) {
    return res.redirect('/404');
  }
  next();
}
export { guestsOnly, loggedOnly };
