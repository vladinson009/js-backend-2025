import { Router } from 'express';
import cosmeticService from '../services/cosmeticService.js';
import errorParser from '../utils/errorParser.js';
import { loggedOnly } from '../middlewares/routesGuards.js';

const cosmeticController = Router();

cosmeticController.get('/', async (req, res) => {
  try {
    const products = await cosmeticService.getAll().lean();
    res.render('cosmetic/catalog', { products });
  } catch (error) {
    res.redirect('/404');
  }
});
cosmeticController.get('/create', loggedOnly, (req, res) => {
  res.render('cosmetic/create');
});
cosmeticController.post('/create', loggedOnly, async (req, res) => {
  const userInput = req.body;
  const userId = res.locals.user?._id;
  if (userId) {
    try {
      await cosmeticService.create(userInput, userId);
      res.redirect('/products');
    } catch (err) {
      const error = errorParser(err);
      res.render('cosmetic/create', { error, userInput });
    }
  }
});
cosmeticController.get('/details/:cosmeticId', async (req, res) => {
  const { cosmeticId } = req.params;
  const userId = res.locals.user?._id;
  try {
    const product = await cosmeticService.getById(cosmeticId).lean();
    product.ingredients = product.ingredients.split(', ').join(' / ');
    const isAuthor = product.owner.equals(userId);
    const isRecommended = product.recommendList.some((el) => el.equals(userId));
    res.render('cosmetic/details', { product, isAuthor, isRecommended });
  } catch (error) {
    res.redirect('/404');
  }
});
cosmeticController.get('/edit/:cosmeticId', loggedOnly, async (req, res) => {
  const { cosmeticId } = req.params;

  try {
    const product = await cosmeticService.getById(cosmeticId).lean();
    if (!product.owner.equals(res.locals.user._id)) {
      return res.redirect('/404');
    }
    res.render('cosmetic/edit', { product });
  } catch (error) {
    res.redirect('/404');
  }
});
cosmeticController.post('/edit/:cosmeticId', loggedOnly, async (req, res) => {
  const { cosmeticId } = req.params;
  const product = req.body;
  try {
    await cosmeticService.updateById(cosmeticId, product);
    res.redirect(`/products/details/${cosmeticId}`);
  } catch (err) {
    const error = errorParser(err);
    res.render('cosmetic/edit', { product, error });
  }
});
cosmeticController.get('/delete/:cosmeticId', loggedOnly, async (req, res) => {
  const { cosmeticId } = req.params;
  try {
    const product = await cosmeticService
      .getById(cosmeticId)
      .select({ owner: 1, _id: 0 });

    if (!product.owner.equals(res.locals.user._id)) {
      return res.redirect('/404');
    }
    await cosmeticService.deleteById(cosmeticId);
    res.redirect('/products');
  } catch (error) {
    res.redirect('/404');
  }
});
cosmeticController.get('/recommend/:cosmeticId', loggedOnly, async (req, res) => {
  const { cosmeticId } = req.params;
  const userId = res.locals.user?._id;
  if (userId) {
    try {
      const { owner } = await cosmeticService
        .getById(cosmeticId)
        .select({ owner: 1, _id: 0 });
      if (owner.equals(userId)) {
        return redirect('/404');
      }
      await cosmeticService.addToReccommend(cosmeticId, userId);
      res.redirect(`/products/details/${cosmeticId}`);
    } catch (error) {
      res.redirect('/404');
    }
  }
});
cosmeticController.get('/search', async (req, res) => {
  const { includes } = req.query;
  try {
    const products = await cosmeticService.getAll(includes).lean();
    res.render('cosmetic/search', { products, includes });
  } catch (error) {}
});

export default cosmeticController;
