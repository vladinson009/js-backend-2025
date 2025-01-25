import { Router } from 'express';

const aboutController = Router();

aboutController.get('/about', (req, res) => {
  res.render('about');
});
export default aboutController;
