import { Router } from 'express';
import deviceService from '../services/deviceService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  const lastThreeDevices = await deviceService.getLastThreeDevices().lean();

  res.render('home', { devices: lastThreeDevices });
});
homeController.get('/about', (req, res) => {
  res.render('about');
});
export default homeController;
