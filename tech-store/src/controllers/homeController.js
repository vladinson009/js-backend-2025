import { Router } from 'express';
import deviceService from '../services/deviceService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  const lastThreeDevices = await deviceService.getLastThreeDevices().lean();

  res.render('home', { devices: lastThreeDevices });
});

export default homeController;
