import { Router } from 'express';

const cosmeticController = Router();

// cosmeticController('/', (req, res) => {
//   res.render('cosmetic/catalog');
// });
cosmeticController.get('/', (req, res) => {
  res.render('cosmetic/catalog');
});
export default cosmeticController;
cosmeticController.get('/search', (req, res) => {
  res.render('cosmetic/search');
});
